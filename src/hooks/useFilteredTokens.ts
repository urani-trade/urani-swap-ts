import { useMemo } from "react";
import { useTokensWithBalance } from "./useTokensWithBalance";

const stringToCompare = (search: string | number | null | undefined) =>
  String(search)?.toLowerCase().trim().replace(/\W+/g, "");

export function useFilteredTokens(searchText: string) {
  const tokensWithBalance = useTokensWithBalance();

  const normalizedSearchText = stringToCompare(searchText);

  const filteredTokens = useMemo(() => {
    if (normalizedSearchText === "") return tokensWithBalance;

    const filtered = tokensWithBalance.filter((item) => {
      if (
        stringToCompare(item.type).includes(normalizedSearchText) ||
        stringToCompare(item.name).includes(normalizedSearchText) ||
        stringToCompare(item.address).includes(normalizedSearchText) ||
        stringToCompare(item.symbol).includes(normalizedSearchText)
      )
        return true;
      return false;
    });
    return filtered;
  }, [tokensWithBalance, normalizedSearchText]);

  return filteredTokens;
}
