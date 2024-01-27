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
import { Collection, getCollections } from "@/util/getCollections";

export default function Home() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  const { data: session } = useSession();
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollections();
        setCollections(result);
      } catch (error) {
        console.error("Error fetching collections:", error);
        // Handle errors (e.g., show an error message to the user)
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  const renderCollections = () => {
    if (loading) {
      return <p>Loading...</p>; // Show a loading message while fetching data
    }

    if (!collections || collections.length === 0) {
      return <p>No collections found.</p>; // Handle case when no collections are available
    }

    return (
      <div>
        {collections.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {/* Add more content as needed */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <h1>logo</h1>
        </div>
        <MagicEdenLoginButton />
      </header>
      <main className={styles.main}>
        <Image width={64} height={64} src={Logo} alt="user avatar" />
        <div>
          <h3>Address: {session?.user?.name}</h3>
          <p>Expires: {new Date(session?.expires || "").toTimeString()}</p>
        </div>
        {renderCollections()} {/* Call the renderCollections function */}
      </main>
    </>
  );
}
