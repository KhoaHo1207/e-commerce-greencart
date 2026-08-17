import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/images/logo.svg"}
        alt="greencart_logo"
        width={100}
        height={100}
        className="object-contain w-34 md:w-38 cursor-pointer"
        loading="eager"
      />
    </Link>
  );
}
