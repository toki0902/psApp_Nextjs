"use client";
import React, { useState } from "react";

const MenuItem = ({
  icon,
  hoverIcon,
  text,
  onClick,
}: {
  icon: string;
  hoverIcon: string;
  text: string;
  onClick: () => void;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        style={{
          backgroundImage: `url(${isHover ? hoverIcon : icon})`,
          backgroundSize: "93%",
        }}
        className="w-[10%] bg-no-repeat bg-center aspect-square group-hover:animate-shake"
      />
      <p className="w-[90%] px-2">{text}</p>
    </div>
  );
};

export default MenuItem;
