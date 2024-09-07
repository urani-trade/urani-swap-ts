import { convertRelativeTimeToUTCTimestamp, getSolAmount } from "@/lib/utils";
// import {
//   getNonceAcccountPublicKey,
//   getNonceAuthorityAccountKeypair,
// } from "@/lib/constants";
import { useCallback, useMemo } from "react";

import axios from "@/app/api/axios";
// import { useEnv } from "@/components/layout/EnvProvider";
// import { useNonceAccount } from "./useNonceAccount";
// import { useOrderTransaction } from "./useOrderTransaction";
import { useSwap } from "@/components/trade/swap/SwapProvider";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";

// const env = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

export function useSubmitLimitOrder() {
  const {
    sellAmount,
    sellSelectedToken: sellToken,
    buyAmount,
    buySelectedToken: buyToken,
    expireTime,
    setOrderStatus,
    setErrorMessage,
    // setSolscanUrl,
  } = useSwap();
  // const envValues = useEnv();

  const { publicKey } = useUnifiedWallet();

  // const { getNonceAccount } = useNonceAccount();
  // const { buildTransaction, signAndSendTransaction } = useOrderTransaction();

  const transactionData = useMemo(
    () => ({
      srcToken: sellToken?.address,
      srcAddress: publicKey?.toString(),
      srcAmount: getSolAmount(sellAmount as number, sellToken?.decimals ?? 1),
      dstToken: buyToken?.address,
      dstAddress: publicKey?.toString(),
      minReceived: getSolAmount(buyAmount as number, buyToken?.decimals ?? 1),
      exp: convertRelativeTimeToUTCTimestamp(expireTime),
      isPartiallyFillable: false,
      agentSource: "swap",
    }),
    [sellToken, publicKey, sellAmount, buyAmount, buyToken, expireTime],
  );

  const submitLimitOrder = useCallback(async () => {
    try {
      setOrderStatus("PENDING");
      // const nonceAccount = await getNonceAccount(
      //   getNonceAcccountPublicKey(envValues),
      // );

      // const transaction = buildTransaction(transactionData, {
      //   nonceAccount,
      //   nonceAccountAuthorityKeypair:
      //     getNonceAuthorityAccountKeypair(envValues),
      // });
      // const signature = await signAndSendTransaction(transaction);

      // const url = `https://solscan.io/tx/${signature}${env === "Mainnet" ? "" : "?cluster=devnet"}`;

      // setSolscanUrl(url);

      const params = {
        // intentId: signature,
        intentId: Math.floor(Math.random() * 1000000), // Random numeric intentId,
        srcToken: transactionData.srcToken,
        srcAddress: transactionData.srcAddress,
        srcAmount: transactionData.srcAmount,
        dstToken: transactionData.dstToken,
        dstAddress: transactionData.dstAddress,
        minReceived: transactionData.minReceived,
        expiration: transactionData.exp,
        // batchId: null,
      };

      console.info("Trying to submit order to api", params);

      const orderbook = await axios.post("/orders", params);

      console.log({ orderbook });

      setOrderStatus("SUBMITED");
    } catch (error) {
      const { message } = error as { message: string };
      console.error("Error signing or sending the transaction:", error);
      setErrorMessage(message ?? "");
      setOrderStatus("ERROR");
    }
  }, [transactionData, setOrderStatus, setErrorMessage]);

  return submitLimitOrder;
}
