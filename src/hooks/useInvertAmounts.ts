import { useCallback } from "react";
import { useSwap } from "@/components/trade/swap/SwapProvider";

export function useInvertAmounts() {
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

  const invertAmounts = useCallback(() => {
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
    setSellSelectedToken(buySelectedToken);
    setBuySelectedToken(sellSelectedToken);
  }, [
    setBuyAmount,
    setBuySelectedToken,
    setSellAmount,
    setSellSelectedToken,
    sellAmount,
    buyAmount,
    sellSelectedToken,
    buySelectedToken,
  ]);

  return invertAmounts;
}
