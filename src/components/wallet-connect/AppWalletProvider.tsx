"use client";

import {
  ConnectionProvider,
  UnifiedWalletProvider,
} from "@jup-ag/wallet-adapter";
import React, { useMemo } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import WalletNotification from "./WalletNotification";
import { clusterApiUrl } from "@solana/web3.js";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork[process.env.NEXT_PUBLIC_SOLANA_NETWORK];
  const endpoint = useMemo(() => {
    if (process.env.NEXT_PUBLIC_SOLANA_NETWORK === "Mainnet")
      return `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <UnifiedWalletProvider
        wallets={wallets}
        config={{
          autoConnect: false,
          env: network,
          metadata: {
            name: "Urani Swap",
            description: "Urani Swap",
            url: "https://urani.trade",
            iconUrls: ["https://urani.trade/favicon.ico"],
          },
          walletlistExplanation: {
            href: "https://station.jup.ag/docs/additional-topics/wallet-list",
          },
          notificationCallback: WalletNotification,
        }}
      >
        {children}
      </UnifiedWalletProvider>
    </ConnectionProvider>
  );
}
