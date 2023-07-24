import React from "react";
import { AuthButtonProps } from "./types";
import { Avatar } from "../Avatar";

export function AuthenButton({
  buttonlabel = "Connect",
  buttonBackground,
  avatarSrc = "",
  customButton,
  customAvatar,
  onClick,
  onAvatarClick,
  address,
}: AuthButtonProps) {
  const renderButton = () => {
    return customButton ? (
      customButton(buttonlabel, onClick)
    ) : (
      <button
        style={{ backgroundColor: buttonBackground }}
        className="buttonContainer"
        onClick={onClick}
      >
        {buttonlabel}
      </button>
    );
  };
  const renderAvatar = () => {
    return customAvatar ? (
      customAvatar(address, avatarSrc, onAvatarClick)
    ) : (
      <div className="avatarContainer">
        <p className="address" title={address}>
          {address.slice(0, 5)}...
          {address.slice(address.length - 5, address.length)}
        </p>
        <Avatar avatarSrc={avatarSrc} />
      </div>
    );
  };
  return (
    <div>{!address || address === "" ? renderButton() : renderAvatar()}</div>
  );
}
