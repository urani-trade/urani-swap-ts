import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";

import { useCallback } from "react";

export function useTransferSol() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useUnifiedWallet();

  const transferSol = useCallback(
    async (toAccountPublicKey: PublicKey) => {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signTransaction)
        throw new Error("Wallet does not support transaction signing!");

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const fundTransferTx = new Transaction();
      fundTransferTx.feePayer = publicKey;
      fundTransferTx.recentBlockhash = blockhash;
      fundTransferTx.lastValidBlockHeight = lastValidBlockHeight;
      fundTransferTx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toAccountPublicKey,
          lamports: LAMPORTS_PER_SOL,
        }),
      );

      const signedTx = await signTransaction(fundTransferTx);
      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
      );
      const confirmation = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "finalized",
      );

      return confirmation;
    },
    [connection, publicKey, signTransaction],
  );

  return transferSol;
}
