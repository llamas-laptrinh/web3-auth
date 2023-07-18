import React from "react";
import styles from "./button.module.css";
import dynamic from "next/dynamic";
import { ConnectButtonProps } from "./types";
import Avatar from "../Avatar";
import DefaulAvatar from "../../public/logo.png";

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function ConnectButton({
  buttonlabel = "Connect",
  buttonBackground,
  avatarSrc = DefaulAvatar,
  customButton,
  customAvatar,
  onClick,
  onAvatarClick,
  address,
}: ConnectButtonProps) {
  return (
    <div>
      <div className={styles.walletButtons}>
        <WalletMultiButtonDynamic />
        <WalletDisconnectButtonDynamic />
      </div>
      {!address || address === "" ? (
        customButton ? (
          customButton(buttonlabel, onClick)
        ) : (
          <button
            style={{ backgroundColor: buttonBackground }}
            className={styles.buttonContainer}
            onClick={onClick}
          >
            {buttonlabel}
          </button>
        )
      ) : customAvatar ? (
        customAvatar(address, avatarSrc, onAvatarClick)
      ) : (
        <div className={styles.avatarContainer}>
          <p className={styles.address} title={address}>
            {address.slice(0, 5)}...
            {address.slice(address.length - 5, address.length)}
          </p>
          <Avatar avatarSrc={avatarSrc} />
        </div>
      )}
    </div>
  );
}
