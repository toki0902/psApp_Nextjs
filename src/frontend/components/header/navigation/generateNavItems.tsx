import { NavMenuOption } from "@/src/frontend/types/header";
import { Session } from "next-auth";
import React from "react";
import { navItemDefinitions } from "./navItemDefinitions";
import { useRouter } from "next/navigation";
import NavItem from "./NavItem";

export const generateNavItems = (
  session: Session,
  navMenuOption: NavMenuOption,
) => {
  const { userId } = session.user;

  const router = useRouter();

  const defKeys = Object.keys(navMenuOption).filter(
    (key): key is keyof typeof navItemDefinitions =>
      key in navItemDefinitions &&
      navMenuOption[key as keyof NavMenuOption] === true,
  );

  const navItems = defKeys
    .sort((a, b) => {
      if (a === "login") return 1;
      if (b === "login") return -1;
      return a.localeCompare(b);
    })
    .map((key) => {
      const { text, defaultIcon, hoverIcon } = navItemDefinitions[key];
      return (
        <NavItem
          text={text}
          key={key}
          hoverIcon={hoverIcon}
          icon={defaultIcon}
          onClick={() => {
            if (key === "home") {
              router.push("/");
            } else if (key === "favorite") {
              router.push(`/users/${userId}/playlists`);
            } else if (key === "login") {
              router.push("/v1/api/auth/signin");
            }
          }}
        />
      );
    });

  return navItems;
};
