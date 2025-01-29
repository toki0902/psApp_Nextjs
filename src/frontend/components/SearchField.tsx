"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { buildEncodedUrl } from "../utils/url";

type Props = {
  value?: string;
  atSearch?: boolean;
};

const SearchField = ({ value = "" }: Props) => {
  const [keyword, setKeyword] = useState(value);
  const router = useRouter();

  return (
    <div className="w-96 h-10 pl-4 text-lg text-blue flex justify-between items-center border rounded-full border-blue">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        className="w-[85%] bg-inherit h-8 mr-4 focus:outline-none"
        placeholder="動画を検索"
      />
      <a
        href={buildEncodedUrl(`/search?q=${keyword}`)}
        className="w-[15%] h-full border-l border-blue flex justify-center items-center cursor-pointer"
      >
        <img
          src="/images/searchIcon.svg"
          alt="search"
          className="w-[70%] h-[70%]"
        />
      </a>
    </div>
  );
};

export default SearchField;
