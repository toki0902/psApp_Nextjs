import React from "react";

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
  return (
    <li
      style={{ margin: text === "ログイン" ? "0" : "0 20px 0 0" }}
      className="cursor-pointer"
    >
      <button
        className="group relative flex w-fit items-center"
        onClick={onClick}
      >
        <img src={icon} alt={text} className="mr-1 w-5 group-hover:opacity-0" />
        <img
          src={hoverIcon}
          alt={text}
          className="absolute left-0 top-1/2 w-5 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        />
        <p className="group-hover:text-red">{text}</p>
      </button>
    </li>
  );
};

export default NavItem;
