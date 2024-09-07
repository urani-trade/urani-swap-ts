import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function useSolBalance() {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();
  const [solBalance, setSolBalance] = useState<number>();

  const getBalance = useCallback(async () => {
    if (!publicKey || !connection) return;

    const balance =
      (await connection.getBalance(publicKey, "confirmed")) / LAMPORTS_PER_SOL;

    setSolBalance(balance);
  }, [publicKey, connection]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return solBalance;
}
