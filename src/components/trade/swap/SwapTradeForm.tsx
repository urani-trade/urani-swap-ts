"use client";

import { useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import AdditionalInfo from "./AdditionalInfo";
import SubmitButton from "./SubmitButton";
import TradeSelectors from "./TradeSelectors";
import TransactionMessage from "@/components/utils/TransactionMessage";
import { VersionedTransaction } from "@solana/web3.js";
import WarningMev from "@/components/utils/WarningMev";
import useDebounce from "@/hooks/useDebounce";
import useJupiterQuotes from "@/hooks/useJupiterQuotes";
import { useSwap } from "./SwapProvider";

export default function SwapTradeForm() {
  const {
    sellAmount,
    setBuyAmount,
    sellSelectedToken,
    buySelectedToken,
    orderStatus,
    setOrderStatus,
    setSolscanUrl,
    setErrorMessage,
  } = useSwap();

  const wallet = useWallet();
  const { connection } = useConnection();

  const throttledAmount = useDebounce(sellAmount, 1000);

  const { quote, outputAmount, isLoading } = useJupiterQuotes(
    setErrorMessage,
    setOrderStatus,
    sellSelectedToken,
    buySelectedToken,
    Number(throttledAmount),
  );

  useEffect(() => {
    if (outputAmount) {
      setBuyAmount(outputAmount);
    }
  }, [outputAmount, setBuyAmount]);

  const onSubmit = useCallback(async () => {
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        "Wallet is not connected or does not support signing transactions",
      );
      return;
    }

    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true,
          // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // feeAccount: "fee_account_public_key"
        }),
      })
    ).json();

    setOrderStatus("PENDING");

    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      setSolscanUrl(`https://solscan.io/tx/${txid}`);

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed",
      );
      setOrderStatus("SUBMITED");
    } catch (error) {
      const { message } = error as { message: string };
      console.error("Error signing or sending the transaction:", error);
      setErrorMessage(message ?? "");
      setOrderStatus("ERROR");
    }
  }, [
    wallet,
    connection,
    quote,
    setOrderStatus,
    setSolscanUrl,
    setErrorMessage,
  ]);

  // if (error && orderStatus === "ERROR") {
  //   return (
  //     <TransactionMessage
  //       type="error"
  //       icon="report"
  //       mainMessage={error ?? "Error trying to get quote."}
  //       buttonText="Dismiss"
  //       buttonAction={() => {
  //         resetAll();
  //         setOrderStatus("INCOMPLETE");
  //       }}
  //     />
  //   );
  // }
  return orderStatus === "PENDING" ? (
    <TransactionMessage
      type="pending"
      icon="progress_activity"
      mainMessage="Your order is being sent"
    />
  ) : (
    <div className="w-full h-full flex flex-col">
      <WarningMev />
      <TradeSelectors isLoading={isLoading} />
      <AdditionalInfo slippage={0.5} />
      <div className="mt-6">
        <SubmitButton
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
