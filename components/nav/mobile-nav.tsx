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

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const closeOpen = () => setOpen(false)
  const pathName = usePathname()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 border w-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="px-5">
            <div className="flex justify-between">
              <X size={24} onClick={closeOpen} className="cursor-pointer" />
              <button className="border border-white rounded-full px-3 py-1 md:px-4 md:py-1 text-sm md:text-base whitespace-nowrap flex-shrink-0 hover:bg-white hover:text-black transition duration-300">
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
      className={cn("text-lg", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
