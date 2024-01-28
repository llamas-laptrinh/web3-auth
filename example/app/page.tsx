"use client";
import React, { useMemo, useState, useEffect } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/logo.png";
import { MagicEdenLoginButton } from "@/components/MagicEdenLoginButton";
import { CollectionsApiResponse, getCollections } from "@/util/getCollections";

export default function Home() {
  const { data: session } = useSession();
  const [collections, setCollections] = useState<CollectionsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollections();
        setCollections(result);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCollections = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!collections || !collections.data || collections.data.length === 0) {
      return <p>No collections found.</p>;
    }

    return (
      <div>
        {collections.data.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
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
