import React from "react";

const PageMenuItem = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: string;
  onClick: () => void;
}) => {
  return (
    <li
      className="group flex cursor-pointer items-center overflow-hidden"
      onClick={onClick}
    >
      <img
        src={icon}
        alt="icon"
        className="group h-6 w-6 lg:group-hover:animate-toLeftForFavorite"
      />
      <p className="hidden lg:group-hover:block lg:group-hover:animate-toUpInForFavorite">
        {text}
      </p>
    </li>
  );
};

export default PageMenuItem;
