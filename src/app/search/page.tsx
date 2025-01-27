"use client";
import PasswordModal from "@/src/frontend/components/PasswordModal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const isCookieSet = () => {
    return false;
  };

  useEffect(() => {
    if (isCookieSet()) {
      //apiリクエスト
    } else {
      setIsOpenModal(true);
    }
  }, []);
  return (
    <>
      {isOpenModal && (
        <PasswordModal
          path={`/search?q=${query}`}
          close={() => {
            router.push("/");
          }}
        ></PasswordModal>
      )}
    </>
  );
};

export default Search;
