"use client";
import React, { useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { isVerifiedPassPhrase } from "../utils/cookie.client";
import { useModal } from "../hooks/useModal";

const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [isAllVideo, setIsAllVideo] = useState<boolean>(false);

  const router = useRouter();
  const openModal = useModal().openModal;

  const handleSearch = async () => {
    const isVerified = await isVerifiedPassPhrase();
    if (isVerified) {
      openModal("notice", {
        message: "合言葉を承認しました。",
        type: "normal",
      });
      return router.push(
        `/search?q=${keyword}${isAllVideo ? "&isAllVideo=true" : ""}`,
      );
    } else
      return router.push(
        `/search/check?q=${keyword}${isAllVideo ? "&isAllVideo=true" : ""}`,
      );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget === document.activeElement) {
      e.preventDefault();
      inputRef.current?.blur();
      handleSearch();
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setIsAllVideo(true);
    else setIsAllVideo(false);
  };

  return (
    <div className="relative flex h-9 w-full items-center justify-between rounded-full border border-blue text-base text-blue">
      <div className="flex w-full items-center justify-center space-x-2 px-3">
        <input
          type="text"
          ref={inputRef}
          value={keyword}
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          className="h-8 w-full bg-inherit focus:outline-none"
          placeholder="動画を検索"
        />
        <button onClick={() => setKeyword("")} className="relative h-6 w-6">
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue"></span>
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-blue"></span>
        </button>
      </div>
      <button
        onClick={handleSearch}
        className="flex h-full w-14 cursor-pointer items-center justify-center border-l border-blue"
      >
        <div className="relative h-[70%] w-[70%]">
          <img
            src="/images/searchIcon.svg"
            className="h-full w-full"
            alt="searchIcon"
          />
        </div>
      </button>
      <label className="absolute bottom-0 flex translate-y-[120%] items-center justify-center text-sm">
        <input
          type="checkbox"
          name="agree"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        全ての動画を含める
      </label>
    </div>
  );
};

export default SearchField;
