import * as ed from "@noble/ed25519";

import { sha512 } from "@noble/hashes/sha512";
import { useCallback } from "react";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { verify } from "@noble/ed25519";

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

export function useSignMessage() {
  const { publicKey, signMessage } = useUnifiedWallet();

  const getMessageSignature = useCallback(
    async (data: unknown) => {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const message = new TextEncoder().encode(JSON.stringify(data));
      const signature = await signMessage(message);

      if (!verify(signature, message, publicKey.toBytes()))
        throw new Error("Invalid signature!");

      return signature;
    },
    [publicKey, signMessage],
  );

  return getMessageSignature;
}
