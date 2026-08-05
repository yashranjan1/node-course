import type { Metadata } from "next";
import "./global.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Node Course — User Admin",
  description: "Example product frontend for the Panenco Node course",
};

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <Providers>
          <NavigationMenu className={"w-full"}>
            <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/users" />}
                    className={navigationMenuTriggerStyle()}
                  >Users</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link href="/posts" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Posts
                  </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex-1">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}