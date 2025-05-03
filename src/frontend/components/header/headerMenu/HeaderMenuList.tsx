import { HeaderMenuOption } from "@/src/frontend/types/header";
import React from "react";
import { headerMenuDefinitions } from "./headerMenuDefinitions";
import HeaderMenuItem from "./HeaderMenuItem";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const HeaderMenuList = ({
  session,
  headerMenuOption,
  closeUserMenu,
}: {
  session: Session;
  headerMenuOption: HeaderMenuOption;
  closeUserMenu: () => void;
}) => {
  const router = useRouter();

  const { userId } = session?.user || { userId: "" };

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
          router.push(getHref(userId));
        }}
      />
    );
  });

  return headerMenuItems;
};

export default HeaderMenuList;
