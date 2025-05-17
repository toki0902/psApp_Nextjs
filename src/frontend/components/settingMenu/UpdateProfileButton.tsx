"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";

const UpdateProfileButton = () => {
  const openModal = useModal().openModal;
  const onClick = async () => {
    const newProfileData = await openModal("updateProfileModal");
    if (!newProfileData?.graduationYear && !newProfileData?.name)
      openModal("notice", {
        message: "変更を検知できませでした。",
        type: "error",
      });

    await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/dev`, {
      method: "GET",
    });
  };

  return (
    <button
      onClick={onClick}
      className="ml-5 text-[12px] text-red lg:ml-0 lg:text-sm"
    >
      情報を更新する
    </button>
  );
};

export default UpdateProfileButton;
