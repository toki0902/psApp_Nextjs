import Image from "next/image";
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
      <div className="relative aspect-square w-6">
        <Image src={icon} alt="icon" fill />
      </div>
    </li>
  );
};

export default PageMenuItem;
