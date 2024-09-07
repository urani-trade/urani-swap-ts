## Developer Setup

<br>

Fill in the variables in the `.env` file:

```bash
cp .env.development .env
vim .env
```

where:

* `NEXT_PUBLIC_SOLANA_NETWORK` is the network that will be used for the "limit order" feature. Possible values are: `Testnet`, `Devnet`, and `Mainnet`.
* `NEXT_PUBLIC_HELIUS_API_KEY` is the API key that will be used for Helius, the RPC endpoint used for market orders. Note: market orders are always submitted to production, so this is a production Helius account.
* `PROTOCOL_PROGRAM_ID_PUBLIC_KEY` is the Program ID that the limit orders will be sent out to, when this is enabled.
* `NONCE_AUTHORITY_ACCOUNT_SECRET_KEY` is the secret key of the Nonce authority account, which is used to retrieve the account and sign transactions. This is a Devnet account, used only on limit orders.
* `NONCE_AUTHORITY_ACCOUNT_PUBLIC_KEY` is the public key of the nonce authority account, which is used to retrieve the account. This is a Devnet account, used only on limit orders.
* `NONCE_ACCOUNT_PUBLIC_KEY` is the public key of the actual nonce account, which is used to retrieve the account. This is a Devnet account, used only on limit orders.
* `NONCE_ACCOUNT_SECRET_KEY` is the public key of the actual nonce account, which is used to retrieve the account. This is a Devnet account, used only on limit orders.

<br>

Then, run the development server with:

```bash
npm install
npm run dev
```

<br>

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

<br>

#### Staging 

Make sure you created a new branch and run:

```bash
vercel
```

See **Preview** URL for the staging environment.

<br>

#### Production 

<br>

All commits in `main` branch are automatically deployed to production.

<br>

