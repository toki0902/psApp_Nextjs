"use client";
import { Session } from "next-auth";
import React from "react";
import HeaderMenuList from "./HeaderMenuList";

const HeaderMenu = ({
  session,
  isOpenUserMenu,
  closeUserMenu,
}: {
  session: Session | null;
  isOpenUserMenu: boolean;
  closeUserMenu: () => void;
}) => {
  //パソコンの場合、そもそもログインしていないとこのメニューは開かない。
  //スマホの場合ハンバーガーメニューの中身になるためsessionがある場合とない場合がある。

  return (
    <div
      className={
        isOpenUserMenu
          ? "fixed right-0 top-[70px] z-10 h-[calc(100vh-70px)] w-full rounded-t-xl bg-blue p-5 text-back transition-all duration-300 ease-in-out lg:right-[3%] lg:top-[80px] lg:h-fit lg:w-fit lg:rounded-lg lg:border lg:border-blue lg:bg-back lg:text-blue lg:shadow-xl"
          : "fixed right-0 top-full z-10 h-[calc(100vh-70px)] w-full rounded-t-xl bg-blue p-5 text-back transition-all duration-300 ease-in-out lg:right-[-100%] lg:top-[80px] lg:h-fit lg:w-fit lg:rounded-lg lg:border lg:border-blue lg:bg-back lg:text-blue lg:shadow-xl"
      }
    >
      <div className="hidden w-full space-y-4 lg:block">
        {session ? (
          <div className="flex h-10 w-full items-center justify-start text-xl">
            <p>{session.name}</p>
            <div className="relative ml-2 aspect-square w-10">
              <img
                src={session?.image || ""}
                alt="icon"
                className="h-full w-full rounded-full"
              />
            </div>
          </div>
        ) : null}
        <ul className="w-full space-y-2">
          <HeaderMenuList
            session={session}
            closeUserMenu={closeUserMenu}
            headerMenuOption={{ logout: true, login: true }}
          />
          <hr className="h-[1px] border-none bg-blue" />
          <HeaderMenuList
            session={session}
            closeUserMenu={closeUserMenu}
            headerMenuOption={{ setting: true }}
          />
        </ul>
      </div>
      <div className="flex w-full flex-col items-start justify-center space-y-7 lg:hidden">
        <h2 className="text-base font-bold">アカウント</h2>
        {session ? (
          <div className="flex h-10 w-full items-center justify-start text-base">
            <p>ユーザ: {session.name}</p>
            <div className="relative ml-3 aspect-square w-10">
              <img
                src={session?.image || ""}
                alt="icon"
                className="h-full w-full rounded-full"
              />
            </div>
          </div>
        ) : null}
        <ul className="w-full space-y-4">
          <HeaderMenuList
            session={session}
            headerMenuOption={
              session
                ? { mobileLogin: true, mobileLogout: true }
                : { mobileLogin: true }
            }
            closeUserMenu={closeUserMenu}
          />
        </ul>
        {session ? (
          <>
            <hr className="border-t-1 mx-auto w-full border-back" />
            <h2 className="text-base font-bold">設定</h2>
            <ul className="w-full space-y-4">
              <HeaderMenuList
                session={session}
                headerMenuOption={
                  session
                    ? {
                        mobileSetting: true,
                      }
                    : {}
                }
                closeUserMenu={closeUserMenu}
              />
            </ul>
          </>
        ) : null}
        <hr className="border-t-1 mx-auto w-full border-back" />
        <h2 className="text-base font-bold">アプリ</h2>
        <ul className="w-full space-y-4">
          <HeaderMenuList
            session={session}
            headerMenuOption={
              session
                ? {
                    mobileHome: true,
                    mobileFavorite: true,
                  }
                : { mobileHome: true }
            }
            closeUserMenu={closeUserMenu}
          />
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
