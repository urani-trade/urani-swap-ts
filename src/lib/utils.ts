import { type ClassValue, clsx } from "clsx";
import { Token } from "./interfaces/tokensList";
import { add } from "date-fns";
import { twMerge } from "tailwind-merge";

const relativeTimeConversionTable = {
  m: "minutes",
  h: "hours",
  d: "days",
  M: "months",
} as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenIcon(token: string, tokenList: Token[]) {
  const selectedToken = tokenList.find(
    (t) => t.symbol === token || t.address === token,
  );
  return selectedToken?.logoURI;
}

export function getSymbol(token: string, tokenList: Token[]) {
  return tokenList.find((t) => t.address === token || t.symbol === token)
    ?.symbol;
}

export function getDecimals(token: string, tokenList: Token[]) {
  return tokenList.find((t) => t.address === token || t.symbol === token)
    ?.decimals;
}

export function getUiAmount(amount: number, decimals: number) {
  return amount / Math.pow(10, decimals);
}

export function getSolAmount(uiAmount: number, decimals: number) {
  return Math.round(uiAmount * Math.pow(10, decimals));
}

export function convertRelativeTimeToUTCTimestamp(relativeTime: string | null) {
  if (!relativeTime) return null;

  const [amount, unit] = relativeTime.split("|") as [
    string,
    keyof typeof relativeTimeConversionTable,
  ];

  const addedDate = add(new Date(), {
    [relativeTimeConversionTable[unit]]: parseInt(amount, 10),
  });

  return Math.round(addedDate.getTime() / 1000);
}
