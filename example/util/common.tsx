import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";


// https://api.devnet.solana.com
// https://api.mainnet-beta.solana.com


export const conn = new Connection("https://mainnet.helius-rpc.com/?api-key=bfdf6369-8e47-4969-9acb-f72f2cda9f8e");
export const keypair = Keypair.generate();
console.log(`${process.env.SOLANA_ENDPOINT}`)
export const nftMint = new PublicKey(
  "AhzUD99Lq9wWXLWQHXF6y3gGZzmxyNU9uMBW7hdtpEg4"
);
export const nftSource = getAssociatedTokenAddressSync(
  nftMint,
  keypair.publicKey
);
export const whitelist = new PublicKey(
  "7GLDrSDBVoBkdX1odXQ6WM8qyTrAoje8mx5LeGbRY8PU"
);