"use client";
import React from "react";

const HeaderMenuItem = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <li className="h-10">
      <button
        className="flex h-full w-full items-center justify-start rounded-md hover:bg-[rgb(97,112,132)] lg:hover:bg-[rgb(217,217,217)]"
        onClick={onClick}
      >
        <div className="relative mr-2 h-6 w-6">
          <img src={icon} alt="icon" className="h-full w-full" />
        </div>
        <p className="text-base">{text}</p>
      </button>
    </li>
  );
};

export default HeaderMenuItem;
