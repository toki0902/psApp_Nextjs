import { Session } from "next-auth";
import React from "react";

const HeaderMenu = ({
  session,
  isOpenUserMenu,
}: {
  session: Session;
  isOpenUserMenu: boolean;
}) => {
  return session ? (
    <div
      style={{ right: isOpenUserMenu ? "3%" : "50%" }}
      className="fixed right-[3%] top-40 h-40 w-32 bg-red transition-all duration-500 ease-out"
    ></div>
  ) : null;
};

export default HeaderMenu;
