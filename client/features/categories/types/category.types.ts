import { StaticImageData } from "next/image";

export type Category = {
  text: string;
  path: string;
  image: StaticImageData;
  bgColor: string;
};
