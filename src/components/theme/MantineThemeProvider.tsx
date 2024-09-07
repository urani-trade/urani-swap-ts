"use client";

import {
  CSSVariablesResolver,
  MantineProvider,
  createTheme,
} from "@mantine/core";

import React from "react";

const theme = createTheme({
  radius: {
    lg: "0.5rem",
    xl: "0.75rem",
  },
  defaultRadius: "xl",
  other: {
    backgroundGradient:
      "linear-gradient(287deg, rgba(193,255,255,1) 0%, rgba(227,224,237,1) 25%, rgba(189,179,210,1) 65%, rgba(227,224,237,1) 100%)",
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  dark: {},
  light: {
    "--mantine-color-body": theme.other.backgroundGradient,
  },
});
export default function MantineThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
}
