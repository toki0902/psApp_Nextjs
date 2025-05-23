"use client";
import { Caveat_thin } from "@/src/frontend/assets/fonts/fonts";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const [count, setCount] = React.useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      signIn(undefined, { callbackUrl: "/" }); // 5秒後に /login に遷移
    }, 50000);
    const countdown = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [router]);

  return (
    <div className="h-full w-full">
      <div className="flex h-fit w-full flex-col items-center justify-center rounded-md border-4 border-red p-14 md:flex-row md:space-x-10">
        <div className="relative aspect-square h-40 w-40 lg:h-60 lg:w-60">
          <Image src="/images/loading-11.png" fill alt="notFound" />
        </div>
        <div className="flex flex-col items-start justify-center space-y-5">
          <h2 className="font-bold text-red lg:text-2xl">注意!!</h2>
          <p>
            プライベートブラウザの場合、
            <br />
            この後のログインがうまくいかない場合があります。
          </p>
        </div>
      </div>
      <div
        className={`${Caveat_thin.className} absolute left-1/2 top-[66%] flex -translate-x-1/2 flex-col text-5xl text-red lg:flex-row`}
      >
        <div className="flex items-center justify-center">
          <p>Loading</p>
          <span className="ml-2">
            <span className="animate-dot-first">.</span>
            <span className="animate-dot-second">.</span>
            <span className="animate-dot-third">.</span>
          </span>
        </div>
        <p className="flex items-center text-2xl lg:ml-2">
          {count} seconds left
        </p>
      </div>
    </div>
  );
};

export default Page;
