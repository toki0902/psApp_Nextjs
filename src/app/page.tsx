"use client";
import "@/src/frontend/assets/styles/global.css";
import Image from "next/image";

import Button from "@/components/Button";
import SearchField from "@/components/SearchField";

import { Noto_Serif_bold } from "@/fonts";
import { Caveat_thin } from "@/fonts";
import { Baloo_thin } from "@/fonts";

import coffeeLogo from "public/images/coffee.svg";
import useLoading from "../frontend/hooks/useLoading";
import { useEffect } from "react";
import Loading from "../frontend/components/Loading";

const App = () => {
  const { status, changeStatus, hideLoading } = useLoading({
    initialStatus: "visible",
  });

  useEffect(() => {
    setTimeout(() => {
      changeStatus();
    }, 3000);
  }, []);

  return (
    <>
      <Loading status={status} hideLoading={hideLoading}></Loading>
      <div className="w-1/3 border-red flex flex-col justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="h-full flex justify-center items-center mr-10">
            <Image
              src={coffeeLogo}
              alt="coffee~"
              className="w-24 lg:w-28"
            ></Image>
          </div>
          <div
            className={`${Noto_Serif_bold.className} text-3xl lg:text-4xl 2xl:text-5xl h-full flex justify-center items-center text-center`}
          >
            P.S. <br />
            MEMORIES
          </div>
        </div>
        <div
          className={`${Baloo_thin.className} mt-10 text-1xl lg:text-2xl text-center flex flex-col justify-center items-center tracking-[.3em] text-blue`}
        >
          DOSHISHA ACOUSTIC <br />
          MUSIC CIRCLE
        </div>
      </div>
      <div className="w-fit sm:absolute xl:static top-0 mt-5">
        <SearchField></SearchField>
      </div>

      <div
        className={`${Caveat_thin.className} w-1/3 h-full flex flex-col justify-center items-center border-red space-y-10`}
      >
        <Button href="/asdf">FAVORITE</Button>
        <Button href="/search">SEARCH</Button>
        <Button>LOGIN</Button>
      </div>
    </>
  );
};

export default App;
