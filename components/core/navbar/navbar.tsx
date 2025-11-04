import { apps } from "@/lib/constants";
import {
  Navbar as HeroNavbar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import Link from "next/link";

export default function Navbar() {
  return (
    <HeroNavbar className="shadow-md">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-black text-inherit">
            STRONA GŁÓWNA
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {apps.map((app, index) => (
          <NavbarItem key={index}>
            <Link href={app.path}>{app.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenuToggle className="sm:hidden" />
      <NavbarMenu>
        {apps.map((app, index) => (
          <NavbarMenuItem key={index}>
            <Link href={app.path}>{app.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
