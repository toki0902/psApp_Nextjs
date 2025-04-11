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
        className={`${Kaisei.className} animate-drop-in-forModal fixed left-1/2 top-1/2 z-20 flex aspect-[16/9] w-1/2 max-w-[750px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-between rounded-xl border-2 border-red bg-back py-20 lg:py-24 xl:py-28`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2 className="text-2xl">本当によろしいですか？</h2>
        <div className="flex w-fit space-x-20">
          <button
            onClick={onPassCheck}
            className="h-9 w-24 rounded-md border border-red px-2 text-red hover:bg-red hover:text-back"
          >
            はい
          </button>
          <button
            onClick={close}
            className="h-9 w-24 rounded-md border border-red px-2 text-red hover:bg-red hover:text-back"
          >
            いいえ
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
