"use client";
import React from "react";
import SearchField from "../SearchField";
import { useRouter, useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import HeaderMenu from "./HeaderMenu";
import { generateNavItems } from "./navigation/generateNavItems";

const Header = ({ session }: { session: Session }) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);
  const query = useSearchParams().get("q");
  const router = useRouter();

  const unLoginNavItems = generateNavItems(session, {
    home: true,
    login: true,
  });

  const loginNavItems = generateNavItems(session, {
    home: true,
    favorite: true,
  });

  return (
    <header className="relative flex h-20 w-full items-center justify-between bg-back px-[3%] text-sm">
      <h1
        className="flex h-10 w-32 cursor-pointer items-center justify-center bg-red"
        onClick={() => router.push("/")}
      />
      <div className="absolute left-1/2 top-1/2 h-fit w-1/3 -translate-x-1/2 -translate-y-1/2">
        <SearchField value={query || undefined} />
      </div>
      {session ? (
        <nav>
          <ul className="flex h-fit w-fit items-center text-blue">
            {loginNavItems}
            <li className="cursor-pointer">
              <button
                className="group flex w-fit items-center"
                onClick={() => {
                  setIsOpenUserMenu((prev) => !prev);
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
          <ul className="flex h-fit w-fit items-center text-blue">
            {unLoginNavItems}
          </ul>
        </nav>
      )}
      <HeaderMenu session={session} isOpenUserMenu={isOpenUserMenu} />
    </header>
  );
};

export default Header;
