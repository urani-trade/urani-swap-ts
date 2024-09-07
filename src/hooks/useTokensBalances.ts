import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenAccountInfo } from "@/lib/interfaces/tokenAccounts";

export function useTokensBalances() {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();

  const [balanceData, setBalanceData] = useState<TokenAccountInfo[]>([]);

  const getBalanceData = useCallback(async () => {
    if (!publicKey || !connection) return;

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );

    if (tokenAccounts.value.length <= 0) return;

    const balanceData: TokenAccountInfo[] = tokenAccounts.value.map(
      (token) => token.account.data.parsed.info,
    );

    setBalanceData(balanceData);
  }, [connection, publicKey]);

  useEffect(() => {
    getBalanceData();
  }, [getBalanceData]);

  return balanceData;
}
