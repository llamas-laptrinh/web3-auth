/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import React from "react";

type avatarProps = {
  avatarSrc: string;
  onClick?: () => void;
};

export function Avatar({ avatarSrc }: avatarProps) {
  return (
    <div className="container">
      <img width={32} height={32} src={avatarSrc} alt="avatar" />
      {/* <Image width={32} height={32} src={avatarSrc} alt="avatar" /> */}
    </div>
  );
}
