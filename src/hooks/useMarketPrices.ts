import { TokenWithPriceFeed, tokenPriceFeedIds } from "@/lib/tokenPriceFeedIds";
import { useCallback, useEffect, useState } from "react";

import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { compact } from "lodash-es";

interface MarketPrices {
  sellingTokenToUSD: number | null;
  buyingTokenToUSD: number | null;
  sellingTokenToBuyingToken: number | null;
  isLoading: boolean;
}

const initialState = {
  sellingTokenToUSD: null,
  buyingTokenToUSD: null,
  sellingTokenToBuyingToken: null,
  isLoading: false,
};

export default function useMarketPrices(
  sellingToken?: TokenWithPriceFeed | null,
  buyingToken?: TokenWithPriceFeed | null,
  fetchInterval = 30000,
) {
  const [marketPrices, setMarketPrices] = useState<MarketPrices>(initialState);

  const getMarketPrices = useCallback(async () => {
    if (!sellingToken) return;

    setMarketPrices({ ...initialState, isLoading: true });

    const connection = new PriceServiceConnection(
      "https://hermes.pyth.network",
    );

    const feedIds = compact([sellingToken, buyingToken]).map(
      (pair) => tokenPriceFeedIds[pair],
    );

    try {
      const latestPrices = await connection.getLatestPriceFeeds(feedIds);
      if (!latestPrices) {
        setMarketPrices((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const displayPrices = latestPrices.map((price) => {
        const currentPrice = price.getPriceUnchecked();
        return currentPrice.getPriceAsNumberUnchecked();
      });

      if (displayPrices.length === 1) {
        setMarketPrices({
          sellingTokenToUSD: displayPrices[0],
          buyingTokenToUSD: null,
          sellingTokenToBuyingToken: null,
          isLoading: false,
        });
        return;
      }

      const conversionPrice = displayPrices[0] / displayPrices[1];

      setMarketPrices({
        sellingTokenToUSD: displayPrices[0],
        buyingTokenToUSD: displayPrices[1],
        sellingTokenToBuyingToken: conversionPrice,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching market prices", error);
      setMarketPrices((prev) => ({ ...prev, isLoading: false }));
    }
  }, [buyingToken, sellingToken]);

  useEffect(() => {
    getMarketPrices();

    const interval = setInterval(() => {
      getMarketPrices();
    }, fetchInterval);

    return () => clearInterval(interval);
  }, [getMarketPrices, fetchInterval]);

  return marketPrices;
}
