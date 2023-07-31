import { ReactNode } from "react";

export type AuthButtonProps = {
  buttonlabel?: string;
  buttonBackground?: string;
  address: string;
  avatarSrc?: string | any;
  onClick?: () => void;
  onAvatarClick?: () => void;
  customButton?: (buttonlabel: string, onClick?: () => void) => ReactNode;
  customAvatar?: (
    address: string,
    avatarSrc: string | any,
    onClick?: () => void
  ) => ReactNode;
};
