"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { signIn } from "next-auth/react";

const UpdateProfileButton = () => {
  const openModal = useModal().openModal;
  const onClick = async () => {
    const newProfileData = await openModal("updateProfileModal");
    if (!newProfileData?.graduationYear && !newProfileData?.name)
      return openModal("notice", {
        message: "変更を検知できませでした。",
        type: "error",
      });

    const patchRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/profile`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProfileData?.name || null,
          graduationYear: newProfileData?.graduationYear || null,
        }),
      },
    );

    if (!patchRes.ok) {
      const errorData = await patchRes.json();
      return openModal("notice", {
        message: errorData.message,
        type: "error",
      });
    }

    const resData = await patchRes.json();
    await openModal("notice", {
      message: resData.message,
      type: "normal",
    });

    return await signIn(resData.provider);
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
