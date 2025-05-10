"use client";
import React, { useRef, useState } from "react";
import { buildEncodedUrl } from "../utils/url";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
  value?: string;
};

const SearchField = ({ value = "" }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState(value);

  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      router.push(`/search?q=${keyword}`);
    }
  };

  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-blue text-base text-blue">
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
      <a
        href={buildEncodedUrl(`/search?q=${keyword}`)}
        className="flex h-full w-14 cursor-pointer items-center justify-center border-l border-blue"
      >
        <img
          src="/images/searchIcon.svg"
          alt="search"
          className="h-[70%] w-[70%]"
        />
      </a>
    </div>
  );
};

export default SearchField;
