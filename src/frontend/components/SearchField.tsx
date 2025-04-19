"use client";
import React, { useState } from "react";
import { buildEncodedUrl } from "../utils/url";

type Props = {
  value?: string;
};

const SearchField = ({ value = "" }: Props) => {
  const [keyword, setKeyword] = useState(value);

  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-blue pl-4 text-base text-blue">
      <input
        type="text"
        value={keyword}
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
