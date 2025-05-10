import React from "react";

const PageMenuItem = ({
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
      <img src={icon} alt="icon" className="h-6 w-6" />
    </li>
  );
};

export default PageMenuItem;
