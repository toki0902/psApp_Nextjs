"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { buildEncodedUrl } from "../utils/url";
import PasswordModal from "./PasswordModal";

const SearchField = () => {
  const [keyword, setKeyword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  //TODO: cookie周りをなんとかしないといけなし！
  const isCookieSet = () => {
    return false;
  };
  const onSearch = () => {
    if (isCookieSet()) {
      const path = `/search?q=${keyword}`;
      const encodedUrl = buildEncodedUrl(path);
      console.log(encodedUrl);
    } else {
      setIsOpenModal(true);
    }
  };

  return (
    <div className="w-96 h-10 pl-4 text-lg text-blue absolute top-0 flex justify-between items-center border rounded-full border-blue">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        className="w-[85%] bg-inherit h-8 mr-4 focus:outline-none"
        placeholder="動画を検索"
      />
      <div
        className="w-[15%] h-full border-l border-blue flex justify-center items-center cursor-pointer"
        onClick={onSearch}
      >
        <img
          src="/images/searchIcon.svg"
          alt="search"
          className="w-[70%] h-[70%]"
        />
      </div>
      {isOpenModal && (
        <PasswordModal
          path={`/search?q=${keyword}`}
          close={() => {
            setIsOpenModal(false);
          }}
        ></PasswordModal>
      )}
    </div>
  );
};

export default SearchField;
