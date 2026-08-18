import Logo from "@/components/layout/logo";
import Link from "next/link";

const linkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "All Products", href: "/products" },
      { label: "Best Sellers", href: "/#best-sellers" },
      { label: "Categories", href: "/#categories" },
    ],
  },
  {
    title: "Need Help?",
    links: [
      { label: "Sign In", href: "/sign-in" },
      { label: "Create Account", href: "/sign-up" },
      { label: "My Orders", href: "/my-orders" },
      { label: "Contact", href: "/#newsletter" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter", href: "https://x.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-secondary text-secondary-foreground">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-border text-muted-foreground">
        <div>
          <Logo />
          <p className="max-w-[410px] mt-6">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="font-semibold text-base text-foreground md:mb-5 mb-2">
                {section.title}
              </h2>
              <ul className="text-sm space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground hover:underline transition-colors"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-muted-foreground">
        Copyright 2026 © <Link href="/">GreenCart</Link>. All rights reserved.
      </p>
    </footer>
  );
}
