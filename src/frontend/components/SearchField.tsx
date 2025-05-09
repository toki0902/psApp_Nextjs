"use client";
import React, { useRef, useState } from "react";
import { buildEncodedUrl } from "../utils/url";
import { useRouter } from "next/navigation";

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
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-blue pl-4 text-base text-blue">
      <input
        type="text"
        ref={inputRef}
        value={keyword}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        className="mr-4 h-8 w-[85%] bg-inherit focus:outline-none"
        placeholder="動画を検索"
      />
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
