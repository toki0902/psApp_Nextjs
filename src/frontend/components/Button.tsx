"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ButtonChild = {
  children?: React.ReactNode;
  href?: string;
  inVisible?: boolean;
};

const Button = ({ children, href, inVisible = false }: ButtonChild) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const redirect = () => {
    if (!href) {
      return;
    }
    router.push(href);
  };

  const onError = async () => {
    setError("ログインしてください");
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
  };

  return inVisible ? (
    <div className="w-80 h-14 lg:h-16 xl:h-20 relative">
      <button
        onClick={onError}
        className="bg-[url('/images/buttonFlame_2C4A52.svg')] opacity-50 bg-contain bg-no-repeat bg-center w-80 h-14 lg:h-16 xl:h-20 flex justify-center items-center text-blue cursor-not-allowed text-2xl lg:text-3xl"
      >
        {children}
        {/* <div className="w-[90%] h-full absolute">
          <div className="w-full h-1 bg-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div> */}
      </button>
      {error && (
        <p className="min-w-min text-red absolute -top-6 text-lg left-1/2 -translate-x-1/2 text-nowrap">
          {error}
        </p>
      )}
    </div>
  ) : (
    <button
      onClick={redirect}
      className="bg-[url('/images/buttonFlame_2C4A52.svg')] hover:bg-[url('/images/buttonFlame_823A42.svg')] bg-contain bg-no-repeat bg-center w-80 h-14 lg:h-16 xl:h-20 flex justify-center items-center text-blue hover:text-red cursor-pointer text-2xl lg:text-3xl"
    >
      {children}
    </button>
  );
};

export default Button;
