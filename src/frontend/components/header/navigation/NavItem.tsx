"use client";
import React, { useState } from "react";

const NavItem = ({
  text,
  icon,
  hoverIcon,
  onClick,
}: {
  text: string;
  icon: string;
  hoverIcon: string;
  onClick: () => void;
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      style={{ margin: text === "ログイン" ? "0" : "0 20px 0 0" }}
      className="cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        className="group relative flex w-fit items-center"
        onClick={onClick}
      >
        <div className="relative mr-1 aspect-square w-5">
          <img
            src={isHover ? hoverIcon : icon}
            alt="icon"
            className="h-full w-full"
          />
        </div>
        <p className="group-hover:text-red">{text}</p>
      </button>
    </li>
  );
};

export default NavItem;
