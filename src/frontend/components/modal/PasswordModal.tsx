"use client";
import React, { useEffect, useState } from "react";

import { Kaisei } from "../../assets/fonts/fonts";
import { isCorrectPassword } from "../../utils/validation";
import Image from "next/image";

type props = {
  onPassCheck: () => void;
  close: () => void;
};

const PasswordModal = ({ onPassCheck, close }: props) => {
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  let timer: NodeJS.Timeout | null = null;

  const onIncorrect = () => {
    setIsCorrect(false);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setIsCorrect(null);
    }, 5000);
  };

  const onClick = () => {
    if (isCorrectPassword(password)) {
      onPassCheck();
    } else {
      onIncorrect();
    }
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} fixed left-1/2 top-1/2 z-40 flex aspect-[16/9] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform animate-drop-in-forModal flex-col items-center justify-center rounded-md border-2 border-red bg-back lg:w-1/2 lg:max-w-[700px] lg:rounded-xl`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2 className="mb-6 text-lg lg:mb-8 lg:text-2xl xl:mb-10">
          秘密の合言葉を教えてください
        </h2>
        <input
          type="text"
          className="h-10 w-2/3 rounded-lg px-2 outline-none lg:mb-8 xl:mb-10"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="absolute bottom-0 h-9 w-full border-t border-red px-2 text-red lg:static lg:w-fit lg:rounded-md lg:border lg:hover:bg-red lg:hover:text-back"
          onClick={onClick}
        >
          確かめる
        </button>
        {isCorrect === false ? (
          <div className="absolute left-1/2 top-[45%] flex w-fit -translate-x-1/2 -translate-y-1/2 items-center text-nowrap text-red lg:top-[40%]">
            <div className="relative mr-1 aspect-square w-3 lg:mr-2 lg:w-5">
              <Image src="/images/warning.svg" alt="warningIcon" fill />
            </div>
            <p className="text-sm lg:text-base">合言葉が違います。</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PasswordModal;
