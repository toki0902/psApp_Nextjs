import { NavMenuOption } from "@/src/frontend/types/header";
import { Session } from "next-auth";
import React from "react";
import { navItemDefinitions } from "./navItemDefinitions";
import { useRouter } from "next/navigation";
import NavItem from "./NavItem";

type Props = { session: Session; navMenuOption: NavMenuOption };

export const NavMenuList = ({ session, navMenuOption }: Props) => {
  const { userId } = session?.user || "";

  const router = useRouter();

  const defKeys = Object.keys(navMenuOption).filter(
    (key): key is keyof typeof navItemDefinitions =>
      key in navItemDefinitions &&
      navMenuOption[key as keyof NavMenuOption] === true,
  );

  //ログインを一番右に
  const navItems = defKeys
    .sort((a, b) => {
      if (a === "login") return 1;
      if (b === "login") return -1;
      return a.localeCompare(b);
    })
    .map((key) => {
      const { text, defaultIcon, hoverIcon, getHref } = navItemDefinitions[key];
      return (
        <NavItem
          text={text}
          key={key}
          hoverIcon={hoverIcon}
          icon={defaultIcon}
          onClick={() => {
            router.push(getHref(userId));
          }}
        />
      );
    });

  return navItems;
};
