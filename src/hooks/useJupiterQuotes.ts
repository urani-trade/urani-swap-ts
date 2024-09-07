import { useCallback, useEffect, useState } from "react";

import { OrderStatus } from "@/lib/interfaces/OrderStatus";
import { Token } from "@/lib/interfaces/tokensList";

interface QuoteOrder {
  outAmount: string | null;

  inAmount?: string;
  inputMint?: string;
  contextSlot?: number;
  otherAmountThreshold?: string;
  outputMint?: string;
  platformFee?: null;
  priceImpactPct?: string;
  slippageBps?: number;
  swapMode?: string;
  timeTaken?: number;
  error?: string;
}

interface Response {
  quote?: QuoteOrder;
  outputAmount: number | null;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  outputAmount: null,
  isLoading: false,
};

export default function useJupiterQuotes(
  setErrorMessage: (message: string) => void,
  setOrderStatus: (status: OrderStatus) => void,
  sellingToken?: Token | null,
  buyingToken?: Token | null,
  currentAmount?: number,
) {
  const [quoteResponse, setQuoteResponse] = useState<Response>(initialState);
  const [outputAmount, setOutputAmount] = useState<number | null>(null);

  const getQuote = useCallback(async () => {
    if (!sellingToken || !buyingToken || !currentAmount) return;

    if (isNaN(currentAmount) || currentAmount <= 0) {
      return;
    }

    setQuoteResponse({ ...initialState, isLoading: true });

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${sellingToken?.address}&outputMint=${buyingToken?.address}&amount=${currentAmount * Math.pow(10, sellingToken?.decimals)}&slippage=0.5`;

    const quote = await (await fetch(url)).json();

    if (quote.error) {
      setOrderStatus("ERROR");
      setErrorMessage(
        quote.errorCode === "TOKEN_NOT_TRADABLE"
          ? "This token is not tradable."
          : quote.error,
      );
      return setQuoteResponse({
        ...quoteResponse,
        isLoading: false,
      });
    }
    if (quote && quote.outAmount) {
      const outAmountNumber =
        Number(quote.outAmount) / Math.pow(10, buyingToken.decimals);
      setOutputAmount(outAmountNumber);
    }

    setQuoteResponse({
      ...quoteResponse,
      quote,
      outputAmount,
      isLoading: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyingToken, sellingToken, currentAmount, outputAmount]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  return quoteResponse;
}
