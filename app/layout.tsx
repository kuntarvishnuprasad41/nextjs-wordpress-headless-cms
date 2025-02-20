import "./globals.css";

import type { Metadata } from "next";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";

import Balancer from "react-wrap-balancer";
import Logo from "@/public/pro_co_leader.svg";
import LogoWhite from "@/public/pro_co_leader_white.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import SocialMedia from "@/components/ui/social-media";

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
        <Nav mode="dark" />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id, mode }: NavProps) => {
  return (
    <nav
      className={cn(`sticky z-50 top-0 ${mode === "dark" ? "text-white bg-black" : "text-black bg-white"}`, "", className)}
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
              src={mode === "dark" ? LogoWhite : Logo}
              alt="Logo"
              loading="eager"
              width={120}
              height={40}
            ></Image>
          </Link>
          <div className="flex items-center gap-2">
            <div className="mx-2 hidden nav-md:flex nav-md:gap-6">
              {Object.entries(mainMenu).map(([key, href], index) => (
                <Link href={href} key={index}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 items-center flex-shrink-0 px-4">
          <button className={`border ${mode === "dark" ? "border-white text-white" : "border-black text-black"} rounded-full px-3 py-1 nav-md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300`}>
            Sign In
          </button>
          <button className={`hidden nav-md:block border ${mode === "dark" ? "border-white text-white" : "border-black text-black"} rounded-full px-3 py-1 md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300`}>
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
    <footer className="py-6 md:px-36 bg-black/20 text-sm md:text-base">
      <section className="flex flex-col gap-6 p-6">
        <Image
          src={Logo}
          alt="Logo"
          loading="eager"
          className="mx-0 md:mx-auto"
          width={120}
          height={40}
        ></Image>
        <div className="md:w-[800px] md:mx-auto md:text-wrap md:text-center">
          ProCo & Leader is where tomorrow is realized. It is the essential source of information and ideas that make sense of a world in constant transformation. The ProCo & Leader conversation illuminates how technology is changing every aspect of our lives—from culture to business, science to design. The breakthroughs and innovations that we uncover lead to new ways of thinking, new connections, and new industries
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">About us</h1>
            <div className="flex flex-col gap-2">
              <h1>Our vision</h1>
              <h1>Leadership and governance</h1>
              <h1>Our impact</h1>
              <h1>Careers</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">More from ProCo</h1>
            <div className="flex flex-col gap-2">
              <h1>ProCo Stories</h1>
              <h1>Picture gallery</h1>
              <h1>Podcasts</h1>
              <h1>Videos</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Engage with us</h1>
            <div className="flex flex-col gap-2">
              <h1>Sign in</h1>
              <h1>Partner with us</h1>
              <h1>Become a member</h1>
              <h1>Subscribe for newsletter</h1>
              <h1>Contact us</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Quick links</h1>
            <div className="flex flex-col gap-2">
              <h1>Sustainability at ProCo</h1>
              <h1>Advertise</h1>
              <h1>About ads</h1>
            </div>
          </div>
        </div>
        <div className="md:mx-auto">
          <SocialMedia facebook="#" instagram="#" linkdin="#" twitter="#" />
        </div>
        <div className="flex md:flex-row flex-col gap-2 md:gap-6 md:mx-auto text-black/60">
          <h1>Privacy policy</h1>
          <h1>Terms of service</h1>
          <h1>Terms of use</h1>
          <h1>Code of conduct</h1>
          <h1>Cookie preference</h1>
        </div>
        <div className="md:mx-auto">© 2025 ProCo & Leader. All rights reserved</div>
      </section>
    </footer>
  );
};
