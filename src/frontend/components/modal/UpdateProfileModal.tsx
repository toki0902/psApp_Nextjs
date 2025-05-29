"use client";
import React, { useState } from "react";
import { Noto_Serif_bold } from "../../assets/fonts/fonts";

type Props = {
  onPassCheck: (arg: {
    name: string | null;
    graduationYear: number | null;
  }) => void;
  close: () => void;
};

const UpdateProfileModal = ({ onPassCheck, close }: Props) => {
  const [newName, setNewName] = useState<string | null>(null);
  const [shouldChangeName, setShouldChangeName] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const toggleNameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setShouldChangeName(true);
    else {
      setShouldChangeName(false);
      setNewName(null);
    }
  };

  const [newGraduationYear, setNewGraduationYear] = useState<number | null>(
    null,
  );
  const [shouldChangeYear, setShouldChangeYear] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const toggleYearCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setShouldChangeYear(true);
    else {
      setShouldChangeYear(false);
      setNewGraduationYear(null);
    }
  };

  const onClick = () => {
    const isOkName = (shouldChangeName && newName) || !shouldChangeName;

    const isOkYear =
      (shouldChangeYear &&
        newGraduationYear &&
        newGraduationYear > 1999 &&
        newGraduationYear < 2200) ||
      !shouldChangeYear;

    if (isOkName && isOkYear)
      onPassCheck({ name: newName, graduationYear: newGraduationYear });
    else {
      if (!isOkName) setIsValidName(false);
      if (!isOkYear) setIsValidYear(false);
      setTimeout(() => {
        setIsValidName(true);
        setIsValidYear(true);
      }, 5000);
    }
  };

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
            <h2 className="text-lg font-bold lg:text-2xl">ユーザ情報更新</h2>
            <div className="relative h-7 w-7 cursor-pointer" onClick={close}>
              <div className="absolute top-1/2 h-[2px] w-full rotate-45 bg-red"></div>
              <div className="absolute top-1/2 h-[2px] w-full -rotate-45 bg-red"></div>
            </div>
          </div>
          <div className="relative mb-10 w-full">
            <div
              className={
                shouldChangeName
                  ? "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-red"
                  : "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-black opacity-60"
              }
            >
              <div className="flex cursor-pointer space-x-2">
                <label htmlFor="name">名前</label>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="namebox"
                    checked={shouldChangeName}
                    onChange={toggleNameCheck}
                  />
                  <label htmlFor="namebox">変更する</label>
                </div>
              </div>
              <input
                value={newName || ""}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                className="w-full border-b border-red bg-inherit py-1 text-black focus:outline-none"
                id="name"
                placeholder="名前を入力してください"
                readOnly={!shouldChangeName}
              />
            </div>
            {isValidName ? null : (
              <div className="absolute -bottom-2 left-0 flex w-fit translate-y-full items-center text-nowrap text-red">
                <div className="relative mr-1 aspect-square w-3 lg:mr-2 lg:w-5">
                  <img
                    src="/images/warning.svg"
                    alt="warningIcon"
                    className="h-full w-full"
                  />
                </div>
                <p className="text-sm">名前は1文字以上が有効です。</p>
              </div>
            )}
          </div>

          <div className="relative mb-10 w-full">
            <div
              className={
                shouldChangeYear
                  ? "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-red"
                  : "relative mb-5 flex h-full w-full flex-col items-start justify-center text-sm text-black opacity-60"
              }
            >
              <div className="flex cursor-pointer space-x-2">
                <label htmlFor="year">卒業・卒業予定年度</label>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="yearBox"
                    checked={shouldChangeYear}
                    onChange={toggleYearCheck}
                  />
                  <label htmlFor="yearBox">変更する</label>
                </div>
              </div>
              <input
                value={newGraduationYear || ""}
                onChange={(e) => setNewGraduationYear(e.target.valueAsNumber)}
                type="number"
                className="w-full border-b border-red bg-inherit py-1 text-black focus:outline-none"
                id="year"
                placeholder="卒業・卒業予定年度を入力してください"
                min="2000"
                max="2200"
                step="1"
                readOnly={!shouldChangeYear}
              />
            </div>
            {isValidYear ? null : (
              <div className="absolute -bottom-2 left-0 flex w-fit translate-y-full items-center text-nowrap text-red">
                <div className="relative mr-1 aspect-square w-3 lg:mr-2 lg:w-5">
                  <img
                    src="/images/warning.svg"
                    alt="warningIcon"
                    className="h-full w-full"
                  />
                </div>
                <p className="text-sm">2000年 ~ 2200年でお選びください。</p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onClick}
          className="h-fit w-full border-t border-red py-2 text-red hover:bg-red hover:text-back"
        >
          <p>更新する</p>
        </button>
      </div>
    </>
  );
};

export default UpdateProfileModal;
