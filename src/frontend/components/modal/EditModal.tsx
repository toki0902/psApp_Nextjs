"use client";
import React, { useEffect, useState } from "react";

import { Kaisei } from "../../assets/fonts/fonts";

type props = {
  onPassCheck: (newTitle: string) => void;
  close: () => void;
};

const EditModal = ({ onPassCheck, close }: props) => {
  const [newTitle, setNewTitle] = useState("");
  const [isValid, setIsValid] = useState<null | Boolean>(null);
  let timer: NodeJS.Timeout | null = null;

  const onClick = () => {
    if (!newTitle) {
      onInvalid();
    } else {
      onPassCheck(newTitle);
    }
  };

  const onInvalid = () => {
    setIsValid(false);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setIsValid(null);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} fixed left-1/2 top-1/2 z-20 flex aspect-[16/9] w-1/2 max-w-[750px] -translate-x-1/2 -translate-y-1/2 transform animate-drop-in-forModal flex-col items-center justify-between rounded-xl border-2 border-red bg-back py-16 xl:py-24`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2 className="text-2xl">新しいタイトルを入力してください</h2>
        <input
          type="text"
          className="h-10 w-2/3 rounded-lg px-2 outline-none"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        />
        <button
          className="h-9 w-fit rounded-md border border-red px-2 text-red hover:bg-red hover:text-back"
          onClick={onClick}
        >
          変更する
        </button>
        {isValid === false ? (
          <div className="absolute left-1/2 top-[40%] flex w-fit -translate-x-1/2 -translate-y-1/2 items-center text-nowrap text-red">
            <img className="mr-2 w-5" src="/images/warning.svg" alt="" />
            <p>お気に入りのタイトルは1文字以上が有効です。</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EditModal;
