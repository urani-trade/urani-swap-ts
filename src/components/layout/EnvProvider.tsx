"use client";

import { PropsWithChildren, createContext, useContext, useMemo } from "react";

import { Env } from "@/lib/interfaces/env";

const initialValue = {
  heliusApiKey: "",
  protocolProgramIdPubkey: "",
  nonceAuthorityAccountSecretKey: "",
  nonceAuthorityAccountPubkey: "",
  nonceAccountPubkey: "",
  nonceAccountSecretKey: "",
};

const EnvContext = createContext<Env>(initialValue);

export function EnvProvider({
  env,
  children,
}: PropsWithChildren<{ env: Env }>) {
  const value = useMemo(() => {
    return {
      heliusApiKey: env.heliusApiKey,
      protocolProgramIdPubkey: env.protocolProgramIdPubkey,
      nonceAuthorityAccountSecretKey: env.nonceAuthorityAccountSecretKey,
      nonceAuthorityAccountPubkey: env.nonceAuthorityAccountPubkey,
      nonceAccountPubkey: env.nonceAccountPubkey,
      nonceAccountSecretKey: env.nonceAccountSecretKey,
    };
  }, [env]);

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export const useEnv = () => {
  const context = useContext(EnvContext);

  if (context === undefined) {
    throw new Error("useEnv must be used within a EnvProvider");
  }

  return context;
};
