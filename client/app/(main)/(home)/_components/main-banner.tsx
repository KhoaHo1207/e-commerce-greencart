import { assets } from "@/constants/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Mainbanner() {
  return (
    <section className="relative -mx-6 md:mx-0" aria-labelledby="home-heading">
      <Image
        src={assets.main_banner_bg}
        alt=""
        width={1000}
        height={1000}
        className="w-full hidden md:block"
        priority
      />
      <Image
        src={assets.main_banner_bg_sm}
        alt=""
        width={1000}
        height={1000}
        className="w-full md:hidden"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1
          id="home-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-stone-800"
        >
          Freshness You Can Trust, Savings You will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            href="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary transition rounded text-primary-foreground hover:bg-primary/80"
          >
            Shop now
            <ArrowRight className="w-4 h-4 text-primary-foreground group-hover:translate-x-1 transition md:hidden" />
          </Link>
          <Link
            href="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 text-stone-800"
          >
            Explore deals
            <ArrowRight className="w-4 h-4 text-stone-800 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
}
