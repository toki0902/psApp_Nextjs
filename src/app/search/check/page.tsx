"use client";
import { useModal } from "@/src/frontend/hooks/useModal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const openModal = useModal().openModal;
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const isAllVideo = searchParams.get("isAllVideo");

  const onPassModalCheck = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/cookies/pass-phrase`,
      { method: "POST", credentials: "include" },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log(`${errorData.errorType!}: ${errorData.message}`);
    } else {
      openModal("notice", {
        message: "合言葉を認証しました。",
        type: "normal",
      });
    }
  };

  useEffect(() => {
    const modal = async () => {
      const isOk = await openModal("password");
      if (isOk) {
        await onPassModalCheck();
        router.push(`/search?q=${q}${isAllVideo ? "&isAllVideo=true" : ""}`);
      } else {
        router.push("/");
      }
    };

    modal();
  }, []);

  return <div></div>;
};

export default Page;
