import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SOLANA_NETWORK: keyof typeof WalletAdapterNetwork;
      NEXT_PUBLIC_HELIUS_API_KEY: string;
      PROTOCOL_PROGRAM_ID_PUBLIC_KEY: string;
      NONCE_AUTHORITY_ACCOUNT_SECRET_KEY: string;
      NONCE_AUTHORITY_ACCOUNT_PUBLIC_KEY: string;
      NONCE_ACCOUNT_PUBLIC_KEY: string;
      NONCE_ACCOUNT_SECRET_KEY: string;
    }
  }
}
