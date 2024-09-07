import { Token } from "@/lib/interfaces/tokensList";
import { useMemo } from "react";
import useSolBalance from "./useSolBalance";
import { useTokensBalances } from "./useTokensBalances";

export function useBalance(token: Token | null) {
  const balances = useTokensBalances();
  const solBalance = useSolBalance();

  const balance = useMemo(() => {
    if (!token) return;
    if (token.symbol === "SOL") return solBalance;

    const tokenBalance = balances.find(
      (balance) => balance.mint === token.address,
    );
    return tokenBalance?.tokenAmount.uiAmount;
  }, [balances, token, solBalance]);

  return balance;
}
