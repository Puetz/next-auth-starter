"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  function signOutHandler() {
    signOut();
    console.log("Sign out");
  }
  return (
    <div className="w-full flex flex-row justify-between items-center py-3 px-5">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/client" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Client</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/server" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Server</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signIn" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sign In</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="ghost" onClick={signOutHandler}>
              SignOut
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle></ThemeToggle>
    </div>
  );
}
