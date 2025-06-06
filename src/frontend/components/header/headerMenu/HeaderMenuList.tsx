"use client";
import { HeaderMenuOption } from "@/src/frontend/types/header";
import React from "react";
import { headerMenuDefinitions } from "./headerMenuDefinitions";
import HeaderMenuItem from "./HeaderMenuItem";
import { useRouter } from "next/navigation";

const HeaderMenuList = ({
  headerMenuOption,
  closeUserMenu,
}: {
  headerMenuOption: HeaderMenuOption;
  closeUserMenu: () => void;
}) => {
  const router = useRouter();

  const defKeys = Object.keys(headerMenuOption).filter(
    (key): key is keyof typeof headerMenuDefinitions =>
      key in headerMenuDefinitions &&
      headerMenuOption[key as keyof HeaderMenuOption] === true,
  );

  const headerMenuItems = defKeys.sort().map((key) => {
    const { text, icon, getHref } = headerMenuDefinitions[key];
    return (
      <HeaderMenuItem
        key={key}
        text={text}
        icon={icon}
        onClick={() => {
          closeUserMenu();
          router.push(getHref());
        }}
      />
    );
  });

  return headerMenuItems;
};

export default HeaderMenuList;
