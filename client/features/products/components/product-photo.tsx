import type { ProductImage } from "../types/product.types";
import Image, { type ImageProps } from "next/image";

type ProductPhotoProps = Omit<ImageProps, "src"> & {
  src: ProductImage;
};

export default function ProductPhoto({ src, alt, ...props }: ProductPhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={typeof src === "string"}
      {...props}
    />
  );
}
