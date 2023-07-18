import React from "react";
import styles from "./avatar.module.css";
import Image from "next/image";
import { avatarProps } from "./type";

export default function Avatar({ avatarSrc }: avatarProps) {
  return (
    <div className={styles.container}>
      <Image width={32} height={32} src={avatarSrc} alt="avatar" />
    </div>
  );
}
