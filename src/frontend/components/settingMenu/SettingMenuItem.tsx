"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { label: string; href: string };

const SettingMenuItem = ({ label, href }: Props) => {
  const router = useRouter();

  return (
    <li className="rounded-full bg-red text-[10px] text-back lg:w-full lg:rounded-lg lg:bg-transparent lg:text-sm lg:text-black lg:hover:bg-red lg:hover:text-back">
      <button
        onClick={() => router.push(href)}
        className="flex h-full w-full cursor-pointer items-center justify-center p-2 lg:justify-start lg:p-2"
      >
        {label}
      </button>
    </li>
  );
};

export default SettingMenuItem;
