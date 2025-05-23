"use client";
import { Caveat_thin } from "@/src/frontend/assets/fonts/fonts";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const [count, setCount] = React.useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      signIn(undefined, { callbackUrl: "/" }); // 5秒後に /login に遷移
    }, 5000);
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
            <br />
            プライベートモードを解除してから
            <br />
            ログインしてください。
          </p>
        </div>
      </div>
      <p
        className={`${Caveat_thin.className} absolute left-1/2 top-[66%] flex -translate-x-1/2 text-5xl text-red`}
      >
        Loading
        <span className="mx-2">
          <span className="animate-dot-first">.</span>
          <span className="animate-dot-second">.</span>
          <span className="animate-dot-third">.</span>
        </span>
        {count} seconds left
      </p>
    </div>
  );
};

export default page;
