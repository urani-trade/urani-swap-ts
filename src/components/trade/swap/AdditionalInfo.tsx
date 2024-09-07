import { Token } from "@/lib/interfaces/tokensList";

interface AdditionalInfoProps {
  sellToken?: Token | null;
  buyToken?: Token | null;
  sellingTokenToBuyingToken?: number;
  sellingTokenToUSD?: number | null;
  isDolarInfo?: boolean;
  slippage?: number;
}

export default function AdditionalInfo({
  sellToken,
  buyToken,
  sellingTokenToBuyingToken,
  sellingTokenToUSD,
  slippage,
}: AdditionalInfoProps) {
  return (
    <>
      {sellingTokenToBuyingToken && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          1 {sellToken?.symbol} = {sellingTokenToBuyingToken.toFixed(2)}{" "}
          {buyToken?.symbol} ($ {sellingTokenToUSD?.toFixed(2)})
        </div>
      )}
      {slippage && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Slippage: {slippage}%
        </div>
      )}
      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        Fee (0.0%) - (Alpha)
      </div>
    </>
  );
}
