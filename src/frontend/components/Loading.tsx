"use client";

import React, { useEffect, useState } from "react";
import "@/src/frontend/assets/styles/global.css";

import Image from "next/image";
import psLogo from "public/images/p.s.logo.png";

const Loading = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={
          isOpen
            ? "animate-slowSpin transition duration-1000 opacity-1"
            : "animate-slowSpin transition duration-1000 opacity-0"
        }
      >
        <Image src={psLogo} alt="Official LOGO" width={200}></Image>
      </div>
    </div>
  );
};

export default Loading;
