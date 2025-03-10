"use client";

// React and Next Imports
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Utility Imports
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { mainMenu, contentMenu } from "@/menu.config";
import SocialMedia from "../ui/social-media";
import Image from "next/image";
const darkNavbarArray = ["/"]

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const closeOpen = () => setOpen(false)
  const pathName = usePathname()
  const mode = darkNavbarArray.includes(pathName)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={`p-0 border text-base border-none hover:bg-transparent 
            ${mode ? "hover:text-white" : "hover:text-black"} 
            focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 nav-md:hidden`}
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-4 bg-black text-white border-none">
        <SheetHeader>
          <SheetTitle className="px-5 text-white">
            <div className="flex justify-between">
              <X size={24} onClick={closeOpen} className="cursor-pointer text-white" />
              <button className="border border-white rounded-full px-3 py-1 nav-md:px-4 nav-md:py-1 text-sm nav-md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300">
                Subscribe
              </button>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {Object.entries(mainMenu).map(([key, href]) => (
              <MobileLink className={pathName === href ? "opacity-100" : "opacity-65"} key={key} href={href} onOpenChange={setOpen}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </MobileLink>
            ))}
            <Separator />
            <div className="flex flex-col gap-4">
              <Link href={"#"}>Our vision</Link>
              <Link href={"#"}>Our impact</Link>
            </div>
          </div>
          <SheetFooter className="py-6">
            <SocialMedia facebook="#" instagram="#" linkdin="#" twitter="#" />
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
export function NavContainer({ className, children, id }: { className?: string, children?: React.ReactNode, id?: string }) {
  const pathName = usePathname()
  const mode = darkNavbarArray.includes(pathName)
  return <nav
    className={cn(
      `sticky z-50 top-0 ${mode ? "text-white bg-black" : "text-black bg-white"
      }`,
      "",
      className
    )}
    id={id}
  >
    {children}
  </nav>
}
export function NavImage({ LogoWhite, Logo }: { LogoWhite: string, Logo: string }) {
  const pathName = usePathname()
  const mode = darkNavbarArray.includes(pathName)
  return <Image alt="Logo"
    src={mode ? LogoWhite : Logo}
    loading="eager"
    width={120}
    height={40}></Image>
}
export function NavButtons() {
  const pathName = usePathname()
  const mode = darkNavbarArray.includes(pathName)
  return <div className="flex gap-2 md:gap-4 items-center flex-shrink-0 px-4">
    <button
      className={`border ${mode
        ? "border-white text-white"
        : "border-black text-black"
        } rounded-full px-3 py-1 nav-md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300`}
    >
      Sign In
    </button>
    <button
      className={`hidden nav-md:block border ${mode
        ? "border-white text-white"
        : "border-black text-black"
        } rounded-full px-3 py-1 md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300`}
    >
      Subscribe
    </button>
  </div>
}
interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
