import { Keypair, PublicKey } from "@solana/web3.js";

import { Env } from "./interfaces/env";

export const CMS_NAME = "Urani Swap";

export function getProtocolProgramId(env: Env) {
  return new PublicKey(env.protocolProgramIdPubkey ?? "");
}

export function getNonceAuthorityAccountKeypair(env: Env) {
  const secretKey = env.nonceAuthorityAccountSecretKey ?? "";
  return Keypair.fromSecretKey(
    Uint8Array.from(secretKey.split(",").map((str) => parseInt(str, 10))),
  );
}

export function getNonceAcccountPublicKey(env: Env) {
  return new PublicKey(env.nonceAccountPubkey ?? "");
}
