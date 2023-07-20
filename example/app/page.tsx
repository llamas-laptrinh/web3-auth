"use client";
// import Image from "next/image";
import { getCsrfToken, signIn, signOut } from "next-auth/react";
import styles from "./page.module.css";
import ConnectButton from "@/components/ConnectButton";
import React from "react";
import { connectWallet } from "@/util";
import bs58 from "bs58";
import Signature from "@/util/signature";

export default function Home() {
  const [walletAddress, setWalletAddress] = React.useState("");

  const onConnect = async () => {
    try {
      const { solana }: any = window;
      const wallet = await connectWallet();

      const csrf = await getCsrfToken();
      if (wallet && csrf) {
        const noneUnit8 = Signature.create(csrf);

        const { signature } = await solana.signMessage(noneUnit8);

        const serializedSignature = bs58.encode(signature);

        const response = await signIn("credentials", {
          signature: JSON.stringify({
            host: window.location.host,
            signature: serializedSignature,
            publicKey: wallet.publicKey.toString(),
          }),
          redirect: false,
        });
        console.log('====================================')
        console.log(response)
        console.log('====================================')
        setWalletAddress(wallet.publicKey.toString());

      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ConnectButton
        onClick={onConnect}
        buttonlabel="SignIn by Wallet"
        address={walletAddress}
      />
    </main>
  );
}
