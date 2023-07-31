import React from "react";

import { avatarProps } from "./type";

export function Avatar({
  avatarSrc = "https://ui-avatars.com/api/?name=llmas",
}: avatarProps) {
  return (
    <div className="container">
      <img width={32} height={32} src={avatarSrc} alt="avatar" />
    </div>
  );
}
