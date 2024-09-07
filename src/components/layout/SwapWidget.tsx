"use client";

import { Fragment, useState } from "react";

import LimitForm from "../trade/limit/LimitForm";
import SwapTradeForm from "../trade/swap/SwapTradeForm";
import TransactionMessage from "../utils/TransactionMessage";
import WidgetTabs from "../trade/WidgetTabs";
import WidgetTitle from "../trade/WidgetTitle";
import { useSwap } from "../trade/swap/SwapProvider";

export default function SwapWidget() {
  const [typeSelected, setTypeSelected] = useState<"market" | "limit">("limit");

  const { orderStatus, setOrderStatus, errorMessage, solscanUrl, resetAll } =
    useSwap();

  return (
    <div className="sm:w-[600px] min-h-[400px] mx-0 md:mx-auto my-0 mb-4 px-4 md:px-6 py-8 bg-white rounded-lg shadow-lg dark:bg-zinc-800 grow sm:grow-0">
      <div className="w-full flex flex-col items-center justify-center text-purple">
        <WidgetTitle />
        {orderStatus === "INCOMPLETE" && (
          <WidgetTabs
            selectedTab={typeSelected}
            setSelectedTab={setTypeSelected}
          />
        )}

        {["INCOMPLETE", "PENDING"].includes(orderStatus) && (
          <Fragment>
            {typeSelected === "market" && <SwapTradeForm />}
            {typeSelected === "limit" && <LimitForm />}
          </Fragment>
        )}

        {orderStatus === "SUBMITED" && (
          <TransactionMessage
            type="success"
            icon="task_alt"
            mainMessage="Transaction submitted"
            solscanUrl={solscanUrl}
            buttonText="See your limit orders"
            linkTo="/list-orders"
            buttonAction={() => {
              setOrderStatus("INCOMPLETE");
            }}
          />
        )}

        {orderStatus === "ERROR" && (
          <TransactionMessage
            type="error"
            icon="report"
            mainMessage={errorMessage ?? "Transaction was not submitted."}
            buttonText="Dismiss"
            buttonAction={() => {
              resetAll();
              setOrderStatus("INCOMPLETE");
            }}
          />
        )}
      </div>
    </div>
  );
}
