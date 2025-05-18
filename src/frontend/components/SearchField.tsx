"use client";
import React, { useRef, useState } from "react";
import { buildEncodedUrl } from "../utils/url";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [isAllVideo, setIsAllVideo] = useState<boolean>(false);

  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget === document.activeElement) {
      e.preventDefault();
      inputRef.current?.blur();
      router.push(
        `/search?q=${e.currentTarget.value}${isAllVideo ? "&isAllVideo=true" : ""}`,
      );
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
      <Link
        href={buildEncodedUrl(
          `/search?q=${keyword}${isAllVideo ? "&isAllVideo=true" : ""}`,
        )}
        className="flex h-full w-14 cursor-pointer items-center justify-center border-l border-blue"
      >
        <div className="relative h-[70%] w-[70%]">
          <Image src="/images/searchIcon.svg" alt="searchIcon" fill />
        </div>
      </Link>
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
