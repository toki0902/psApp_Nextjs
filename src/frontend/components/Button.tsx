"use client";
import React from "react";
import { useRouter } from "next/navigation";

type ButtonChild = {
  children?: React.ReactNode;
  href?: string;
};

const Button = ({ children, href }: ButtonChild) => {
  const router = useRouter();

  const redirect = () => {
    if (!href) {
      return;
    }
    router.push(href);
  };
  return (
    <button
      onClick={redirect}
      className="bg-[url('/images/buttonFlame_2C4A52.svg')] hover:bg-[url('/images/buttonFlame_823A42.svg')] bg-contain bg-no-repeat bg-center w-80 h-14 lg:h-16 xl:h-20 flex justify-center items-center text-blue hover:text-red cursor-pointer text-3xl"
    >
      {children}
    </button>
  );
};

export default Button;
