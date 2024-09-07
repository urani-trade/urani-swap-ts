import { useMemo } from "react";
import useSolBalance from "./useSolBalance";
import { useTokenList } from "./useTokenList";
import { useTokensBalances } from "./useTokensBalances";

export function useTokensWithBalance() {
  const tokenList = useTokenList();
  const balances = useTokensBalances();
  const solBalance = useSolBalance();

  const tokensWithBalance = useMemo(
    () =>
      tokenList.map((token) => {
        if (token.type === "native") {
          return { ...token, balance: solBalance };
        } else {
          const balance = balances.find(
            (b) => b.mint.toString() === token.address,
          );

          return { ...token, balance: balance?.tokenAmount?.uiAmount };
        }
      }),
    [balances, solBalance, tokenList],
  );

  return tokensWithBalance;
}
