"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import psLogo from "public/images/p.s.logo.png";

const STATUS = {
  visible: "visible",
  hiding: "hiding",
  hidden: "hidden",
} as const;

type LoadingStatus = (typeof STATUS)[keyof typeof STATUS];

type Props = {
  hideLoading: () => void;
  status: LoadingStatus;
};

const Loading = ({ status, hideLoading }: Props) => {
  console.log(status);
  return (
    <div
      onAnimationEnd={hideLoading}
      className={
        status === "visible"
          ? "w-screen h-screen fixed top-0 right-0 bg-back flex items-center z-30 justify-center animate-focus-in"
          : status === "hiding"
            ? "w-screen h-screen fixed top-0 right-0 bg-back flex items-center z-30 justify-center animate-blur-out"
            : "hidden"
      }
    >
      <div className="animate-slowSpin">
        <Image src={psLogo} alt="Official LOGO" width={200}></Image>
      </div>
    </div>
  );
};

export default Loading;
