import { Session } from "next-auth";
import React from "react";
import generateHeaderMenuItem from "./headerMenu/generateHeaderMenuItem";

const HeaderMenu = ({
  session,
  isOpenUserMenu,
  closeUserMenu,
}: {
  session: Session;
  isOpenUserMenu: boolean;
  closeUserMenu: () => void;
}) => {
  //パソコンの場合、そもそもログインしていないとこのメニューは開かない。
  //スマホの場合ハンバーガーメニューの中身になるためsessionがある場合とない場合がある。
  const headerMenuItems = generateHeaderMenuItem({
    session,
    closeUserMenu,
    headerMenuOption: { logout: true },
  });

  const mobileAccountMenuItems = generateHeaderMenuItem({
    session,
    closeUserMenu,
    headerMenuOption: session
      ? {
          mobileLogout: true,
          mobileLogin: true,
        }
      : { mobileLogin: true },
  });

  const mobileAppMenuItems = generateHeaderMenuItem({
    session,
    closeUserMenu,
    headerMenuOption: session
      ? {
          mobileHome: true,
          mobileFavorite: true,
        }
      : { mobileHome: true },
  });

  return (
    <div
      // style={{ right: isOpenUserMenu ? "3%" : "-50%" }}
      className={
        isOpenUserMenu
          ? "fixed right-0 top-[45px] z-10 h-[calc(100vh-45px)] w-full rounded-t-xl bg-blue p-5 text-back transition-all duration-300 ease-in-out lg:right-[3%] lg:top-[80px] lg:h-fit lg:w-fit lg:rounded-lg lg:border lg:border-blue lg:bg-back lg:text-blue lg:shadow-xl"
          : "fixed right-0 top-full z-10 h-[calc(100vh-45px)] w-full rounded-t-xl bg-blue p-5 text-back transition-all duration-300 ease-in-out lg:right-[-50%] lg:top-[80px] lg:h-fit lg:w-fit lg:rounded-lg lg:border lg:border-blue lg:bg-back lg:text-blue lg:shadow-xl"
      }
    >
      <ul className="hidden w-full space-y-5 lg:block">
        {session ? (
          <li className="flex h-10 w-full items-center justify-start text-xl">
            <p>{session.user.name}</p>
            <img
              src={session.user.image}
              alt="icon"
              className="ml-2 w-10 rounded-full"
            />
          </li>
        ) : null}
        {headerMenuItems}
      </ul>
      <div className="flex w-full flex-col items-start justify-center space-y-7 lg:hidden">
        <h2 className="text-base font-bold">アカウント</h2>
        {session ? (
          <div className="flex h-10 w-full items-center justify-start text-base">
            <p>ユーザ: {session.user.name}</p>
            <img
              src={session.user.image}
              alt="icon"
              className="ml-3 w-10 rounded-full"
            />
          </div>
        ) : null}
        <ul className="w-full space-y-4">{mobileAccountMenuItems}</ul>
        <hr className="border-t-1 mx-auto w-full border-back" />
        <h2 className="text-base font-bold">アプリ</h2>
        <ul className="w-full space-y-4">{mobileAppMenuItems}</ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
