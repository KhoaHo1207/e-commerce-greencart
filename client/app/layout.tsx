import { Providers } from "./providers";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greencart.local"),
  title: {
    default: "GreenCart — Fresh Groceries Delivered",
    template: "%s | GreenCart",
  },
  description:
    "Shop fresh groceries, fruits, vegetables, dairy, and daily essentials. Fast delivery and great savings with GreenCart.",
  openGraph: {
    title: "GreenCart — Fresh Groceries Delivered",
    description:
      "Shop fresh groceries, fruits, vegetables, dairy, and daily essentials with fast delivery.",
    type: "website",
    locale: "en_US",
    siteName: "GreenCart",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
