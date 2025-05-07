"use client";
import React from "react";
import { Kaisei, Noto_Serif_bold } from "../../assets/fonts/fonts";

type Props = { onPassCheck: () => void; close: () => void };

const CheckModal = ({ onPassCheck, close }: Props) => {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Noto_Serif_bold.className} fixed left-1/2 top-1/2 z-20 flex w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 animate-drop-in-forModal flex-col items-center justify-center rounded-md border-2 border-red bg-back lg:w-1/2`}
      >
        <div className="h-full w-full p-6">
          <div className="y-fit mb-6 flex w-full items-center justify-between">
            <h2 className="text-lg font-bold lg:text-2xl">確認</h2>
            <div className="relative h-7 w-7 cursor-pointer" onClick={close}>
              <div className="absolute top-1/2 h-[2px] w-full rotate-45 bg-red"></div>
              <div className="absolute top-1/2 h-[2px] w-full -rotate-45 bg-red"></div>
            </div>
          </div>
          <h2 className="text-base lg:text-lg">本当によろしいですか？</h2>
        </div>
        <div className="flex h-fit w-full items-center">
          <button
            onClick={onPassCheck}
            className="h-fit w-1/2 border-r border-t border-red py-2 text-red hover:bg-red hover:text-back"
          >
            はい
          </button>
          <button
            onClick={close}
            className="h-fit w-1/2 border-t border-red py-2 text-red hover:bg-red hover:text-back"
          >
            いいえ
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
