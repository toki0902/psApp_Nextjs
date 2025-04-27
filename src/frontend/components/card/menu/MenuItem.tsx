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
      className="group flex w-full px-2 py-1 hover:bg-red hover:text-back"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        style={{
          backgroundImage: `url(${isMobile ? hoverIcon : isHover ? hoverIcon : icon})`,
          backgroundSize: "93%",
        }}
        className="aspect-square w-6 bg-center bg-no-repeat group-hover:animate-shake lg:w-[10%]"
      />
      <p className="w-[90%] px-2">{text}</p>
    </div>
  );
};

export default MenuItem;
