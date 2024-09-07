import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { PublicKey } from "@solana/web3.js";
import { TokenAmount } from "@/lib/interfaces/tokenAccounts";

export function useTokenAccountBalance(tokenMintAddress: PublicKey) {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();

  const [balanceData, setBalanceData] = useState<Partial<TokenAmount>>({
    amount: null,
    decimals: null,
    uiAmount: null,
    uiAmountString: null,
  });

  const getBalanceData = useCallback(
    async (address: PublicKey) => {
      if (!publicKey || !connection) return;

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          mint: address,
        },
      );

      if (tokenAccounts.value.length <= 0) return;

      const balance =
        tokenAccounts.value[0].account.data.parsed.info.tokenAmount;

      setBalanceData(balance);
    },
    [connection, publicKey],
  );

  useEffect(() => {
    getBalanceData(tokenMintAddress);
  }, [getBalanceData, tokenMintAddress]);

  return balanceData;
}
