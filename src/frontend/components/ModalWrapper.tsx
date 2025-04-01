"use client";
import React, { useState } from "react";
import PasswordModal from "./PasswordModal";
import { useRouter } from "next/navigation";
import { modalOption } from "../types/playlist";
import CheckModal from "./CheckModal";

const ModalWrapper = ({ modalOption }: { modalOption: modalOption }) => {
  const { type } = modalOption;

  //親クライアントコンポーネントから受け取るState
  let isOpenModal: boolean | null = null;
  //親サーバコンポーネントから受け取る初期状態
  let initialModalOpen: boolean | null = null;

  if (type === "deletePlaylist") {
    isOpenModal = modalOption.isOpenModal;
  } else if (type === "password") {
    initialModalOpen = modalOption.initialOpenModal;
  }

  const [isOpen, setIsOpen] = useState<boolean | null>(initialModalOpen);
  const router = useRouter();

  const close = () => {
    switch (type) {
      case "password":
        router.push("/");
        break;

      case "deletePlaylist":
        modalOption.closeModal();
        break;
    }
  };

  const onPassCheck = async () => {
    switch (type) {
      case "password":
        setIsOpen(false);
        break;
      case "deletePlaylist":
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${modalOption.ownerId}/playlists/id/${modalOption.playlistId}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.log(`${errorData.errorType!}: ${errorData.message}`);
        } else {
          console.log("プレイリストを削除しました。");
          router.refresh();
        }
        break;
    }
  };

  return isOpen && type === "password" ? (
    <PasswordModal onPassCheck={onPassCheck} close={close}></PasswordModal>
  ) : isOpenModal && type === "deletePlaylist" ? (
    <CheckModal onPassCheck={onPassCheck} close={close}></CheckModal>
  ) : (
    <></>
  );
};

export default ModalWrapper;
