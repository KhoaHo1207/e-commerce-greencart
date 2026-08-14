import { assets } from "@/constants/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Mainbanner() {
  return (
    <div className="relative">
      <Image
        src={assets.main_banner_bg}
        alt="banner"
        width={1000}
        height={1000}
        className="w-full hidden md:block"
      />
      <Image
        src={assets.main_banner_bg_sm}
        alt="banner"
        width={1000}
        height={1000}
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
          Freshness You Can Trust, Savings You will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            href={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary transition rounded text-primary-foreground hover:bg-primary/80 cursor-pointer"
          >
            Shop now{" "}
            <ArrowRight className="w-4 h-4 text-primary-foreground group-hover:translate-x-1 transition md:hidden" />
          </Link>
          <Link
            href={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals{" "}
            <ArrowRight className="w-4 h-4 text-foreground group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
