import {
  Keypair,
  NonceAccount,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";

import { getProtocolProgramId } from "@/lib/constants";
import { useCallback } from "react";
import { useEnv } from "@/components/layout/EnvProvider";
import { usePdaAccount } from "./usePdaAccount";

interface NonceAccountExtended extends NonceAccount {
  publicKey: PublicKey;
}

interface NonceAccountWithAuthorityAccount {
  nonceAccount: NonceAccountExtended;
  nonceAccountAuthorityKeypair: Keypair;
}

const MINIMUM_CONTEXT_SLOT = 3;

export function useOrderTransaction() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useUnifiedWallet();
  const [pda, bump] = usePdaAccount();
  const envValues = useEnv();

  const buildTransaction = useCallback(
    (
      transactionData: Record<string, unknown>,
      {
        nonceAccount,
        nonceAccountAuthorityKeypair,
      }: NonceAccountWithAuthorityAccount,
    ) => {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signTransaction)
        throw new Error("Wallet does not support transaction signing!");
      if (!pda) throw new Error("PDA Account could not be derived!");

      const data = { ...transactionData, bump, nonce: nonceAccount.nonce };

      const nonceAdvanceInstruction = SystemProgram.nonceAdvance({
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: nonceAccount.authorizedPubkey,
      });
      const newPdaTx = new Transaction({
        feePayer: publicKey,
        minContextSlot: MINIMUM_CONTEXT_SLOT,
        nonceInfo: {
          nonce: nonceAccount.nonce,
          nonceInstruction: nonceAdvanceInstruction,
        },
      });
      newPdaTx.add(
        nonceAdvanceInstruction,
        new TransactionInstruction({
          keys: [
            {
              pubkey: publicKey,
              isSigner: true,
              isWritable: true,
            },
            {
              pubkey: pda,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
          ],
          data: Buffer.from(JSON.stringify(data)),
          programId: getProtocolProgramId(envValues),
        }),
      );
      newPdaTx.sign(nonceAccountAuthorityKeypair);

      return newPdaTx;
    },
    [publicKey, signTransaction, pda, bump, envValues],
  );

  const signAndSendTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!signTransaction)
        throw new Error("Wallet does not support transaction signing!");

      const signedPdaTx = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedPdaTx.serialize(),
      );
      console.log("Signature:", signature);

      return signature;
    },
    [connection, signTransaction],
  );

  const confirmTransaction = useCallback(
    async (signature: string, nonceAccount: NonceAccount) => {
      await connection.confirmTransaction(
        {
          signature,
          nonceAccountPubkey: nonceAccount.authorizedPubkey,
          nonceValue: nonceAccount.nonce,
          minContextSlot: MINIMUM_CONTEXT_SLOT,
        },
        "finalized",
      );
      console.log("Transaction successfuly finalized:", signature);
    },
    [connection],
  );

  return { buildTransaction, signAndSendTransaction, confirmTransaction };
}
