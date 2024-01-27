"use client";
import { getCsrfToken, signIn, signOut } from "next-auth/react";
import React, { useMemo, useState, useEffect } from "react";
import styles from "./page.module.css";
import { Signature, getProvider } from "@/util";
import bs58 from "bs58";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/logo.png";
import { MagicEdenLoginButton } from "@/components/MagicEdenLoginButton";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export default function Home() {
  // Set the network to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  // Include Magic Eden WalletAdapter here or any other configurations needed
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);
 
  const { data: session } = useSession();
  const onConnect = async () => {
    try {
      const provider = getProvider();

      if (!provider) {
        window.open("https://phantom.app/", "_blank");
      }

      const resp = await provider.connect();
      console.log("Connect", resp.publicKey.toString());
      const csrf = await getCsrfToken();
      if (resp && csrf) {
        const noneUnit8 = Signature.create(csrf);
        const { signature } = await provider.signMessage(noneUnit8);
        const serializedSignature = bs58.encode(signature);
        const message = {
          host: window.location.host,
          publicKey: resp.publicKey.toString(),
          nonce: csrf,
        };
        const response = await signIn("credentials", {
          message: JSON.stringify(message),
          signature: serializedSignature,
          redirect: false,
        });
        if (response?.error) {
          console.log("Error occured:", response.error);
          return;
        }
      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <h1>logo</h1>
        </div>
        <MagicEdenLoginButton buttonBackground={'#fff'} />
      </header>
      <main className={styles.main}>
        <Image width={64} height={64} src={Logo} alt="user avatar" />
        <h4>llmas-laptrinh</h4>
        <div>
          <h3>Address: {session?.user?.name}</h3>
          <p>Expires: {new Date(session?.expires || "").toTimeString()}</p>
        </div>
      </main>
    </>
  );
}
