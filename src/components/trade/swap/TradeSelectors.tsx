import InverterButton from "../InverterButton";
import TokenSelector from "../TokenSelector";
import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import { useSwap } from "./SwapProvider";

interface TradeSelectorsProps {
  sellingTokenToUSD?: number | null;
  buyingTokenToUSD?: number | null;
  isLoading: boolean;
}

export default function TradeSelectors({
  sellingTokenToUSD,
  buyingTokenToUSD,
  isLoading,
}: TradeSelectorsProps) {
  const {
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
  } = useSwap();

  const invertAmounts = useInvertAmounts();

  return (
    <>
      <div className="my-4">
        <TokenSelector
          label="Sell Amount"
          inputValue={sellAmount}
          setInputValue={setSellAmount}
          setSelectedToken={setSellSelectedToken}
          selectedToken={sellSelectedToken}
          tokenToUSDPrice={sellingTokenToUSD}
        />
      </div>
      <InverterButton onInvert={invertAmounts} isLoading={isLoading} />
      <div className="my-4">
        <TokenSelector
          label="Buy Amount"
          inputValue={buyAmount}
          setInputValue={setBuyAmount}
          setSelectedToken={setBuySelectedToken}
          selectedToken={buySelectedToken}
          tokenToUSDPrice={buyingTokenToUSD}
        />
      </div>
    </>
  );
}
