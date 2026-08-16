import { AppContextProvider } from "@/contexts/app-provider";
import AppLayout from "@/layouts/app-layout";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GreenCart",
    template: "%s | GreenCart",
  },
  description: "GreenCart is a platform for buying and selling green products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppContextProvider>
          <AppLayout>{children}</AppLayout>
        </AppContextProvider>
      </body>
    </html>
  );
}
