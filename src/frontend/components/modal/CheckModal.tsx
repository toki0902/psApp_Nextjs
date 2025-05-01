"use client";
import React from "react";
import { Kaisei } from "../../assets/fonts/fonts";

type props = { onPassCheck: () => void; close: () => void };

const CheckModal = ({ onPassCheck, close }: props) => {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} fixed left-1/2 top-1/2 z-20 flex aspect-[16/9] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform animate-drop-in-forModal flex-col items-center justify-center rounded-md border-2 border-red bg-back lg:w-1/2 lg:max-w-[700px] lg:rounded-xl`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2 className="mb-6 text-lg lg:text-2xl xl:mb-10">
          本当によろしいですか？
        </h2>
        <div className="absolute bottom-0 flex w-full lg:static lg:w-fit lg:space-x-20">
          <button
            onClick={onPassCheck}
            className="h-9 w-1/2 border-r border-t border-red text-red hover:bg-red hover:text-back lg:w-24 lg:rounded-md lg:border lg:px-2"
          >
            はい
          </button>
          <button
            onClick={close}
            className="h-9 w-1/2 border-t border-red text-red hover:bg-red hover:text-back lg:w-24 lg:rounded-md lg:border lg:px-2"
          >
            いいえ
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
