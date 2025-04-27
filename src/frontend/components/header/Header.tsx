"use client";
import React, { useState } from "react";
import SearchField from "../SearchField";
import { useRouter, useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import HeaderMenu from "./HeaderMenu";
import { generateNavItems } from "./navigation/generateNavItems";

const Header = ({ session }: { session: Session }) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const query = useSearchParams().get("q");
  const router = useRouter();

  const closeUserMenu = () => {
    setIsOpenUserMenu(false);
  };

  const unLoginNavItems = generateNavItems(session, {
    home: true,
    login: true,
  });

  const loginNavItems = generateNavItems(session, {
    home: true,
    favorite: true,
  });

  return (
    <header className="relative flex h-12 w-full items-center justify-between bg-back px-[3%] text-sm lg:h-20">
      <h1
        className="hidden h-10 w-32 cursor-pointer items-center justify-center bg-red lg:flex"
        onClick={() => router.push("/")}
      />
      <div className="left-1/2 top-1/2 h-fit w-[80%] lg:absolute lg:w-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <SearchField value={query || undefined} />
      </div>
      {session ? (
        <nav>
          <ul className="hidden h-fit w-fit items-center text-blue lg:flex">
            {loginNavItems}
            <li className="cursor-pointer">
              <button
                className="group flex w-fit items-center"
                onClick={() => {
                  return setIsOpenUserMenu((prev) => !prev);
                }}
              >
                <img
                  src={session.user.image}
                  alt="user"
                  className="h-10 w-10 rounded-full"
                />
                <p className="ml-2 group-hover:text-red">{session.user.name}</p>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="hidden h-fit w-fit items-center text-blue lg:flex">
            {unLoginNavItems}
          </ul>
        </nav>
      )}
      <button
        className="relative flex h-7 w-7 flex-col justify-center lg:hidden"
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
      {/* <nav className="absolute left-0 top-full flex h-[calc(100vh-48px)] w-full flex-col rounded-t-xl bg-blue"></nav> */}
      <HeaderMenu
        session={session}
        isOpenUserMenu={isOpenUserMenu}
        closeUserMenu={closeUserMenu}
      />
    </header>
  );
};

export default Header;
