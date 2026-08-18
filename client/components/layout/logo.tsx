import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="GreenCart home">
      <Image
        src="/images/logo.svg"
        alt="GreenCart"
        width={100}
        height={100}
        className="object-contain h-auto w-28 sm:w-34 md:w-38"
        loading="eager"
      />
    </Link>
  );
}
