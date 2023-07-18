import { StaticImageData } from "next/image";

export type avatarProps = {
  avatarSrc: string | StaticImageData;
  onClick?: () => void;
};
