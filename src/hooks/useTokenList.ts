import { Token } from "@/lib/interfaces/tokensList";
import { tokenList } from "@/lib/tokenlist";

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

export function useTokenList(showAll?: boolean) {
  if (!network || showAll)
    return [
      ...tokenList["Mainnet"],
      ...tokenList["Devnet"],
      ...tokenList["Testnet"],
    ] as Token[];

  return tokenList[network] as Token[];
}
