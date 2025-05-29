"use client";
import React, { useState } from "react";
import SearchField from "../SearchField";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import HeaderMenu from "./headerMenu/HeaderMenu";
import { NavMenuList } from "./navigation/NavMenuList";

const Header = ({ session }: { session: Session | null }) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const router = useRouter();

  const closeUserMenu = () => {
    setIsOpenUserMenu(false);
  };

  return (
    <header className="fixed z-30 flex h-[70px] w-full items-start justify-between bg-back px-[3%] pt-2 text-sm lg:h-24 lg:items-center lg:pt-0">
      <h1
        className="relative hidden h-full w-[180px] cursor-pointer lg:flex"
        onClick={() => router.push("/")}
      >
        <img src="/images/h1.logo.svg" className="h-full w-full" alt="psLogo" />
      </h1>
      <div className="left-1/2 top-1/2 h-fit w-[80%] lg:absolute lg:w-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <SearchField />
      </div>
      {session ? (
        <nav>
          <ul className="hidden h-fit w-fit items-center text-blue lg:flex">
            <NavMenuList
              session={session}
              navMenuOption={{ home: true, favorite: true }}
            />
            <li className="cursor-pointer">
              <button
                className="group flex w-fit items-center"
                onClick={() => {
                  return setIsOpenUserMenu((prev) => !prev);
                }}
              >
                <div className="relative h-10 w-10">
                  <img
                    src={session?.image || ""}
                    alt="userIcon"
                    className="h-full w-full rounded-full"
                  />
                </div>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="hidden h-fit w-fit items-center text-blue lg:flex">
            <NavMenuList
              session={session}
              navMenuOption={{
                home: true,
                login: true,
              }}
            />
          </ul>
        </nav>
      )}
      <button
        className="relative flex h-9 w-7 flex-col justify-center lg:hidden"
        onClick={() => setIsOpenUserMenu((prev) => !prev)}
      >
        <span
          className={
            isOpenUserMenu
              ? "absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-blue transition-all duration-300 ease-in-out"
              : "h-[2px] w-full rounded-full bg-blue transition-all duration-300 ease-in-out"
          }
        ></span>
        <span
          className={
            isOpenUserMenu
              ? "absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-blue transition-all duration-300 ease-in-out"
              : "mt-1.5 h-[2px] w-full rounded-full bg-blue transition-all duration-300 ease-in-out"
          }
        ></span>
        <span
          className={
            isOpenUserMenu
              ? "opacity-0 transition-all duration-300 ease-in-out"
              : "mt-1.5 h-[2px] w-full rounded-full bg-blue opacity-100 transition-all duration-300 ease-in-out"
          }
        ></span>
      </button>
      <HeaderMenu
        session={session}
        isOpenUserMenu={isOpenUserMenu}
        closeUserMenu={closeUserMenu}
      />
    </header>
  );
};

export default Header;
