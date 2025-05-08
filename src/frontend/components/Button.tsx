"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ButtonChild = {
  children?: React.ReactNode;
  href?: string;
  inVisible?: boolean;
};

const Button = ({ children, href, inVisible = false }: ButtonChild) => {
  const [error, setError] = useState("");
  const router = useRouter();
  let timer: NodeJS.Timeout;

  const redirect = () => {
    if (!href) {
      return;
    }
    router.push(href);
  };

  const onError = async () => {
    setError("ログインしてください");
    timer = setTimeout(() => {
      setError("");
    }, 5000);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return inVisible ? (
    <div className="relative h-14 w-80 lg:h-16 xl:h-20">
      <button
        onClick={onError}
        className="flex h-14 w-80 cursor-not-allowed items-center justify-center bg-[url('/images/buttonFlame_2C4A52.svg')] bg-contain bg-center bg-no-repeat text-2xl text-blue opacity-50 lg:h-16 lg:text-3xl xl:h-20"
      >
        {children}
      </button>
      {error && (
        <p className="absolute -top-6 left-1/2 min-w-min -translate-x-1/2 text-nowrap text-lg text-red">
          {error}
        </p>
      )}
    </div>
  ) : (
    <button
      onClick={redirect}
      className="flex h-14 w-80 cursor-pointer items-center justify-center bg-[url('/images/buttonFlame_2C4A52.svg')] bg-contain bg-center bg-no-repeat text-2xl text-blue hover:bg-[url('/images/buttonFlame_823A42.svg')] hover:text-red lg:h-16 lg:text-3xl xl:h-20"
    >
      {children}
    </button>
  );
};

export default Button;
