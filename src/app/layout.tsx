import "./globals.css";
import "./material-symbols.css";
// import "splitting/dist/splitting.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata, Viewport } from "next";
import { dm_sans, red_hat_display } from "./fonts/config";

import { GoogleAnalytics } from "@next/third-parties/google";

import AppWalletProvider from "@/components/wallet-connect/AppWalletProvider";
import { ColorSchemeScript } from "@mantine/core";
import MantineThemeProvider from "@/components/theme/MantineThemeProvider";
import { Notifications } from "@mantine/notifications";
import React from "react";

export const metadata: Metadata = {
  title: "Trade Different with Urani",
  description: "Trade Different with Urani",
  icons: {
    icon: "/assets/logos/space/space_logo_tiny.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

const notificationClasses = {
  notification: "bg-cream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dm_sans.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={red_hat_display.variable}>
        <MantineThemeProvider>
          <Notifications
            autoClose={5000}
            position="bottom-right"
            classNames={notificationClasses}
          />
          <AppWalletProvider>{children}</AppWalletProvider>
        </MantineThemeProvider>
      </body>
       <GoogleAnalytics gaId="G-EPFPL5GD6D" /> 
    </html>
  );
}
