"use client";
import React, { useEffect, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="group flex w-full px-2 py-1 hover:bg-red hover:text-back lg:px-[6px]"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative mr-2 h-5 min-h-5 w-5 min-w-5 group-hover:animate-shake">
        <img
          src={isMobile ? hoverIcon : isHover ? hoverIcon : icon}
          alt="text"
          className="h-full w-full"
        />
      </div>
      <div className="">{text}</div>
    </div>
  );
};

export default MenuItem;
