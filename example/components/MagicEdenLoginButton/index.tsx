// Import necessary libraries
import React, { useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { getCollections } from "@/util/getCollections";

import dynamic from "next/dynamic";

// Import Collection type from the util module
import { Collection } from "@/util/getCollections";
import { AuthButtonProps } from "../AuthenButton/types";
import Image from "next/image";
import { Avatar } from "../Avatar";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (module) => module.WalletMultiButton
    ),
  { ssr: false }
);
interface MagicButtonProps  {
  buttonlabel?: string;
  buttonBackground?: string;
};
const WalletDisconnectButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (module) => module.WalletDisconnectButton
    ),
  { ssr: false }
);
// Create a function to connect to Magic Eden Wallet
export function MagicEdenLoginButton({
  buttonlabel = "Connect",
  buttonBackground,
}: MagicButtonProps ) {
  // Set the network to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  // Include Magic Eden WalletAdapter here or any other configurations needed

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  const [collections, setCollections] = useState<Collection[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollections();
        setCollections(result);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchData();
  }, []); // Run only once on mount
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={()=>{
                console.log("Click")
              }}
              style={{
                backgroundColor: "#222",
                fontSize: 20
              }}
            >
              {buttonlabel}
            </button>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
