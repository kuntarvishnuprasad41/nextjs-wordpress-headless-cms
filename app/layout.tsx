import "./globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";

import Balancer from "react-wrap-balancer";
import Logo from "@/public/pro_co_leader.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import localFont from 'next/font/local'

const accurat = localFont({
  src: [
    {
      path: './Akkurat.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Akkurat-Bold.ttf',
      weight: '700',
      style: 'bold',
    }
  ],
})

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", accurat.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-[1600px] mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <div className="flex gap-4">
          <MobileNav />
          <Link
            className="hover:opacity-75 transition-all flex gap-4 items-center flex-shrink-0"
            href="/"
          >
            <Image
              src={Logo}
              alt="Logo"
              loading="eager"
              className="dark:invert"
              width={100}
              height={52}
            ></Image>
          </Link>
          <div className="flex items-center gap-2">
            <div className="mx-2 hidden md:flex">
              {Object.entries(mainMenu).map(([key, href]) => (
                <Button key={href} asChild variant="ghost" size="sm">
                  <Link href={href}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 items-center flex-shrink-0 px-4">
          <button className="border border-white rounded-full px-3 py-1 md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300">
            Sign In
          </button>
          <button className="hidden md:block border border-white rounded-full px-3 py-1 md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300">
            Subscribe
          </button>
        </div>
        {children}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              <Image
                src={Logo}
                alt="Logo"
                className="dark:invert"
                width={42}
                height={26.44}
              ></Image>
            </Link>
            <p>
              <Balancer>{siteConfig.site_description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            &copy; <a href="https://9d8.dev">9d8</a>. All rights reserved.
            2025-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
