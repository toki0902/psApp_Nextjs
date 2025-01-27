"use client";

import { useEffect, useState } from "react";

import "@/src/frontend/assets/styles/global.css";
import Image from "next/image";
import Loading from "@/components/Loading";
import Button from "@/components/Button";

import { Noto_Serif_bold } from "@/fonts";
import { Caveat_thin } from "@/fonts";
import { Baloo_thin } from "@/fonts";

import coffeeLogo from "public/images/coffee.svg";
import SearchField from "../frontend/components/SearchField";

const App = () => {
  //fix : できるだけサーバサイドコンポーネントとしてレンダリングしたいので、useEffectを使用せずにアニメーション発火を起こしたい。
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);
  return isLoaded ? (
    <>
      <div className="w-1/3 border-red flex flex-col justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="h-full flex justify-center items-center mr-10">
            <Image src={coffeeLogo} alt="coffee~" width={120}></Image>
          </div>
          <div
            className={`${Noto_Serif_bold.className} text-5xl  h-full flex justify-center items-center text-center`}
          >
            P.S. <br />
            MEMORIES
          </div>
        </div>
        <div
          className={`${Baloo_thin.className} mt-10 text-2xl text-center flex flex-col justify-center items-center tracking-[.3em] text-blue`}
        >
          DOSHISHA ACOUSTIC <br />
          MUSIC CIRCLE
        </div>
      </div>
      <SearchField></SearchField>
      <div
        className={`${Caveat_thin.className} w-1/3 h-full flex flex-col justify-center items-center border-red space-y-10`}
      >
        <Button href="/asdf">FAVORITE</Button>
        <Button href="/search">SEARCH</Button>
        <Button>LOGIN</Button>
      </div>
    </>
  ) : (
    <Loading></Loading>
  );
};

export default App;
