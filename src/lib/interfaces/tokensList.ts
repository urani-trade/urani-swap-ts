import { tokenPriceFeedIds } from "../tokenPriceFeedIds";

export interface Token {
  type: string;
  name: string;
  address: string | null;
  symbol: keyof typeof tokenPriceFeedIds;
  asset: string | null;
  decimals: number;
  logoURI: string;
  pairs: never[];
}

export interface TokenWithBalance extends Token {
  balance: number | null | undefined;
}
