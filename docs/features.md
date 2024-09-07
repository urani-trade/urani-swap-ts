## Features and Technical Decisions

<br>

### Market Orders

<br>

To bootstrap our system and transition theory into practice, Urani Swap initially offers a fallback mechanism that fills orders at the spot price. This mechanism is temporary and will be phased out once we achieve sufficient volume and network effects.

<br>

---

### Jupiter Integration

<br>

Jupiter provides a straightforward and reliable API that integrates seamlessly with our existing systems for Swap, ensuring quick and accurate market order processing. Jupiter's scalability allows it to handle increased trade volumes without compromising performance. Therefore, we have integrated Jupiter into our Swap app on Solana.

Once the connection is established, market orders are routed through Jupiter in two steps:

* Obtaining quotes from Jupiter with order details such as amount and chosen tokens.
* Submitting the order to Jupiter to process and complete the transaction with some slippage (default to `0.5%`).

While Jupiter integration offers numerous advantages, the initial setup does not include **Maximal Extractable Value (MEV)** protection. Users should be aware of the risks associated with MEV and slippage, and appropriate warnings are displayed.


As we onboard more agents, they should handle market orders, enhancing MEV protection and potentially improving trade execution. For now, Jupiter serves as a robust interim solution.

<br>

---

### Durable Nonce

<br>

A durable nonce in Solana ensures a transaction remains valid even if processed later. It replaces the typical recent block hash with a value stored in a dedicated account, updated with each transaction.

<br>

----

### Program Derived Addresses (PDAs)

<br>

PDAs in Solana generate addresses deterministically based on specific inputs, ensuring consistent and predictable account addresses without managing private keys. Urani leverages PDAs to store intent data and call other programs for transaction fulfillment on the Solana blockchain.

<br>

---

### Signatures

<br>

Once the transaction is crafted with the necessary data, nonce, and PDA, signatures are required to move the funds. The Nonce Authority signs behind the scenes, and the user's wallet signature is also needed. After user approval, the transaction is submitted to the protocol.

<br>

---

### Protocol Submission

<br>

**Hook: `useSubmitLimitOrder`**

When a user submits an intent, selecting the tokens and respective amounts, the following occurs:

1. Crafting the transaction: Combining all necessary components, including durable nonces and PDAs.
2. Signing the transaction: Ensuring signatures from necessary parties, including the user.
3. Submitting the transaction: Sending the signed transaction to Urani for batching, matching, and fulfillment.

<br>

---

### Swap Price Suggestion

<br>

#### Limit Orders

In our v1 (alpha) Swap frontend, we suggest current market prices for token conversions using Pyth's real-time market price feed API. 

Users can change the suggested price for limit orders, which updates every `30` seconds with the latest market data.

<br>

#### Market Orders

**Hook: `useJupiterQuotes`**

For market orders, we obtain quotes from Jupiter using their API to suggest the latest market prices. Orders submitted through Jupiter require using their quotes and timely submission.

<br>

#### Swap Fees

For now, we are not charging any fees for swaps, besides the Jupiter fee in market order. We are considering a fee structure for future versions.

<br>

---

### Urani's Intent Specs

<br>

This documentation provides a detailed explanation of how intents work for a limit order in a swap on the Urani Swap. The code snippet provided demonstrates how to create a limit order intent, including all the necessary parameters for the orderbook.

<br>

#### Orderbook

In our v1 (alpha) Swap frontend, we are sending the intent for limit order to Urani Orderbook API. The Orderbok proccess the order and sends it to the Urani Protocol.

<br>

#### Creating an Intent

To create an intent for a limit order in a Urani Swap, you need to send the encapsulated JavaScript object and sent to the `/orders` endpoint using a `POST` request.

```javascript
POST /order
{
        "intentId": 123456,
        "srcToken": "9wFF5VM1vWxK7EaSg9dLSkY8jZAGs8R4DQ9K9X5Jd2ac",
        "srcAddress": "0ddb0a23e291b4aeb4c031d91ebf7fdea086eff5",
        "srcAmount": 8714,
        "dstToken": "2oNdfRRaxxYE8wRz5xZdqhfv6MFqjVcMkeVusQPh24dP",
        "dstAddress": "0dd10a23e291b4aeb4c031d91ebf7fdea086eff5",
        "minReceived": 1704,
        "expiration": 1718034091
}
```

<br>

####  Parameters

- **intentId**: A unique identifier for the intent. In the provided code, it is generated randomly for demonstration purposes.
- **srcToken**: The source token's address (mint address) on the Solana blockchain.
- **srcAddress**: The wallet address from which the source tokens will be sent.
- **srcAmount**: The amount of source tokens to be swapped.
- **dstToken**: The destination token's address (mint address) on the Solana blockchain.
- **dstAddress**: The wallet address to which the destination tokens will be sent.
- **minReceived**: The minimum amount of destination tokens expected from the swap.
- **expiration**: The expiration timestamp of the intent.

<br>

#### List Orders

To list all orders in the orderbook for the user wallet address, you can send a `GET` request to the `/orders` endpoint.

```javascript
GET /orders?srcAddress={walletAddress}
```

This request will return a list of all orders in the orderbook, including their details, status and the batch.

<br>
