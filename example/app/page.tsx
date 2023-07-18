"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ConnectButton from "@/components/ConnectButton";
import React from "react";
import { connectWallet } from "@/util";

export default function Home() {
  const [walletAddress, setWalletAddress] = React.useState("");

  const onConnect = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
      // alert(error?.message);
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
