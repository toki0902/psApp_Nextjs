"use client";
import React, { useEffect, useState } from "react";

import { Kaisei } from "../assets/fonts/fonts";
import { isCorrectPassword } from "../utils/validation";

type props = {
  onCorrect: () => void;
  close: () => void;
};

const PasswordModal = ({ onCorrect, close }: props) => {
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | Boolean>(null);
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
      onCorrect();
    } else {
      onIncorrect();
      console.log("失敗！！");
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
        className="w-screen h-screen bg-black opacity-50 fixed left-0 top-0 z-10"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} border-2 border-red bg-back w-1/2 max-w-[700px] h-96 z-20 rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center`}
      >
        <div
          className="w-7 h-7 absolute top-7 right-7 cursor-pointer"
          onClick={close}
        >
          <div className="w-full h-[1px] bg-red rotate-45 absolute top-1/2"></div>
          <div className="w-full h-[1px] bg-red -rotate-45 absolute top-1/2"></div>
        </div>
        <h2 className="text-2xl">秘密の合言葉を教えてください</h2>
        <input
          type="text"
          className="w-2/3 h-10 mt-16 px-2 rounded-lg outline-none"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="mt-10 w-fit px-2 h-9 rounded-md border border-red text-red hover:bg-red hover:text-back"
          onClick={onClick}
        >
          確かめる
        </button>
        {isCorrect === false ? (
          <p className="absolute w-fit text-red top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            合言葉が違います
          </p>
        ) : null}
      </div>
    </>
  );
};

export default PasswordModal;
