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
      className="group flex w-full px-2 py-1 hover:bg-red hover:text-back"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        style={{
          backgroundImage: `url(${isHover ? hoverIcon : icon})`,
          backgroundSize: "93%",
        }}
        className="aspect-square w-[10%] bg-center bg-no-repeat group-hover:animate-shake"
      />
      <p className="w-[90%] px-2">{text}</p>
    </div>
  );
};

export default MenuItem;
