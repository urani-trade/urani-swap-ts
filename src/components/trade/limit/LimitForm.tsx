"use client";

import { useCallback, useEffect } from "react";

import InverterButton from "../InverterButton";
import LimitPrice from "./LimitPrice";
import SelectTime from "./SelectTime";
import SubmitButton from "../swap/SubmitButton";
import TokenSelector from "../TokenSelector";
import TransactionMessage from "@/components/utils/TransactionMessage";
import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import useMarketPrices from "@/hooks/useMarketPrices";
import { useSubmitLimitOrder } from "@/hooks/useSubmitLimitOrder";
import { useSwap } from "../swap/SwapProvider";

export default function LimitForm() {
  const {
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
    minReceived,
    setMinReceived,
    expireTime,
    setExpireTime,
    orderStatus,
  } = useSwap();
  const invertAmounts = useInvertAmounts();

  const {
    sellingTokenToBuyingToken,
    sellingTokenToUSD,
    buyingTokenToUSD,
    isLoading,
  } = useMarketPrices(sellSelectedToken?.symbol, buySelectedToken?.symbol);

  const onSubmit = useSubmitLimitOrder();

  const resetToMarket = useCallback(() => {
    if (sellingTokenToBuyingToken) {
      const calculatedMinAmount = sellingTokenToBuyingToken.toFixed(4);

      setMinReceived(calculatedMinAmount);
    }
  }, [sellingTokenToBuyingToken, setMinReceived]);

  useEffect(() => {
    if (minReceived && sellAmount) {
      const calculatedBuyAmount = (
        Number(sellAmount) * Number(minReceived)
      ).toFixed(4);

      setBuyAmount(calculatedBuyAmount);
    }
  }, [minReceived, setBuyAmount, sellAmount]);

  useEffect(() => {
    if (sellingTokenToBuyingToken) {
      resetToMarket();
    }
  }, [sellingTokenToBuyingToken, resetToMarket]);

  return orderStatus === "PENDING" ? (
    <TransactionMessage
      type="pending"
      icon="progress_activity"
      mainMessage="Your order is being sent"
    />
  ) : (
    <div className="w-full h-full flex flex-col gap-4">
      <TokenSelector
        label="Sell Amount"
        inputValue={sellAmount}
        setInputValue={setSellAmount}
        setSelectedToken={setSellSelectedToken}
        selectedToken={sellSelectedToken}
        tokenToUSDPrice={sellingTokenToUSD}
      />
      <LimitPrice
        inputValue={minReceived}
        resetToMarket={resetToMarket}
        setInputValue={setMinReceived}
      />
      <SelectTime setExpireTime={setExpireTime} expireTime={expireTime} />

      <InverterButton
        onInvert={invertAmounts}
        icon="arrow_downward"
        isLoading={isLoading}
      />

      <TokenSelector
        label="Received at least"
        inputValue={buyAmount}
        setInputValue={setBuyAmount}
        setSelectedToken={setBuySelectedToken}
        selectedToken={buySelectedToken}
        tokenToUSDPrice={buyingTokenToUSD}
      />

      <div className="mt-0 md:mt-0">
        <SubmitButton
          onSubmit={onSubmit}
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
