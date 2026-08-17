import { assets, features } from "@/constants/assets";
import Image from "next/image";

export default function BottomBanner() {
  return (
    <div className="relative mt-24">
      <Image
        src={assets.bottom_banner_image}
        alt="Bottom Banner"
        width={1000}
        height={1000}
        className="w-full hidden md:block"
      />
      <Image
        src={assets.bottom_banner_image_sm}
        alt="Bottom Banner"
        width={1000}
        height={1000}
        className="w-full md:hidden block"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-green-700 dark:text-green-800 mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 mt-2">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={24}
                height={24}
                className="md:w-11 w-9"
              />
              <div>
                <h3 className="text-lg font-semibold text-stone-800 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-xs text-stone-600 md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
