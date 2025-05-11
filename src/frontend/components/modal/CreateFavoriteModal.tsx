"use client";
import React, { useEffect, useState } from "react";
import { Noto_Serif_bold } from "../../assets/fonts/fonts";
import Image from "next/image";

type Props = { onPassCheck: (newTitle: string) => void; close: () => void };

const CreateFavoriteModal = ({ onPassCheck, close }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);
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
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Noto_Serif_bold.className} fixed left-1/2 top-1/2 z-40 flex w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform animate-drop-in-forModal flex-col items-center justify-start rounded-md border-2 border-red bg-back lg:w-1/2 lg:max-w-[700px]`}
      >
        <div className="h-full w-full p-6">
          <div className="y-fit mb-10 flex w-full items-center justify-between">
            <h2 className="text-lg font-bold lg:text-2xl">新規作成</h2>
            <div className="relative h-7 w-7 cursor-pointer" onClick={close}>
              <div className="absolute top-1/2 h-[2px] w-full rotate-45 bg-red"></div>
              <div className="absolute top-1/2 h-[2px] w-full -rotate-45 bg-red"></div>
            </div>
          </div>
          <div
            className={
              isFocus
                ? "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-red"
                : "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-black opacity-60"
            }
          >
            <label htmlFor="title">タイトル</label>
            <input
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              className="w-full border-b border-red bg-inherit py-1 text-black focus:outline-none"
              id="title"
              placeholder="タイトルを入力してください"
            />
          </div>
        </div>
        <button
          onClick={onClick}
          className="relative h-fit w-full border-t border-red py-2 text-red hover:bg-red hover:text-back"
        >
          <p>新規作成する</p>
          {isValid === false ? (
            <div className="absolute left-1/2 top-0 flex w-fit -translate-x-1/2 -translate-y-[150%] items-center text-nowrap text-red">
              <div className="relative mr-1 aspect-square w-3 lg:mr-2 lg:w-5">
                <Image src="/images/warning.svg" alt="warningIcon" fill />
              </div>
              <p className="text-sm lg:text-base">
                お気に入りのタイトルは1文字以上が有効です。
              </p>
            </div>
          ) : null}
        </button>
      </div>
    </>
  );
};

export default CreateFavoriteModal;
