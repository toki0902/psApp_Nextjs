import { Session } from "next-auth";
import React from "react";
import generateHeaderMenuItem from "./headerMenu/generateHeaderMenuItem";

const HeaderMenu = ({
  session,
  isOpenUserMenu,
}: {
  session: Session;
  isOpenUserMenu: boolean;
}) => {
  const headerMenuItems = generateHeaderMenuItem({
    headerMenuOption: { logout: true },
  });

  return session ? (
    <div
      style={{ right: isOpenUserMenu ? "-50%" : "3%" }}
      className="fixed right-[3%] top-[80px] h-fit w-fit rounded-lg border border-red p-5 text-red shadow-xl transition-all duration-300 ease-in-out"
    >
      <ul className="space-y-5">
        <li className="flex h-10 w-full items-center justify-start text-xl">
          <p>{session.user.name}</p>
          <img
            src={session.user.image}
            alt="icon"
            className="ml-2 w-10 rounded-full"
          />
        </li>
        {headerMenuItems}
      </ul>
    </div>
  ) : null;
};

export default HeaderMenu;
