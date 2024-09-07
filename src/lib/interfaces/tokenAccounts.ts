export interface TokenAccountInfo {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: TokenAmount;
}

export interface TokenAmount {
  amount: string | null;
  decimals: number | null;
  uiAmount: number | null;
  uiAmountString?: string | null;
}
