import React from "react";
import { Kaisei } from "../assets/fonts/fonts";

type props = { onPassCheck: () => void; close: () => void };

const CheckModal = ({ onPassCheck, close }: props) => {
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
        <h2 className="text-2xl">本当に宜しいですか？</h2>

        <div className="mt-10 w-fit flex space-x-20">
          <button
            onClick={onPassCheck}
            className="w-24 px-2 h-9 rounded-md border border-red text-red hover:bg-red hover:text-back"
          >
            はい
          </button>
          <button
            onClick={close}
            className="w-24 px-2 h-9 rounded-md border border-red text-red hover:bg-red hover:text-back"
          >
            いいえ
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
