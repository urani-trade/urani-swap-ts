import { PublicKey } from "@solana/web3.js";
import { getProtocolProgramId } from "@/lib/constants";
import { useEnv } from "@/components/layout/EnvProvider";
import { useMemo } from "react";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";

export function usePdaAccount() {
  const { publicKey } = useUnifiedWallet();
  const envValues = useEnv();

  const pdaAccount = useMemo(() => {
    if (!publicKey) return [null, null];

    return PublicKey.findProgramAddressSync(
      [Buffer.from("orders"), publicKey.toBuffer()],
      getProtocolProgramId(envValues),
    );
  }, [envValues, publicKey]);

  return pdaAccount;
}
