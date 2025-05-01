"use client";
import React, { useState } from "react";
import PasswordModal from "./PasswordModal";
import { useRouter } from "next/navigation";
import { modalOption } from "../../types/modal";
import CheckModal from "./CheckModal";
import EditModal from "./EditModal";
import FavoriteModal from "./favoriteModal/FavoriteModal";

const ModalWrapper = ({ modalOption }: { modalOption: modalOption }) => {
  const { type } = modalOption;

  //親クライアントコンポーネントから受け取るState
  let whichModalIsOpen: string | null = null;
  //親サーバコンポーネントから受け取る初期状態
  let initialModalOpen: boolean | null = null;

  if (type === "password") {
    initialModalOpen = modalOption.initialOpenModal;
  } else {
    whichModalIsOpen = modalOption.whichModalIsOpen;
  }

  const [isOpen, setIsOpen] = useState<boolean | null>(initialModalOpen);
  const router = useRouter();

  switch (type) {
    case "deleteFromPlaylist": {
      const onPassCheck = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${modalOption.ownerId}/playlists/id/${modalOption.playlistId}/videos/${modalOption.memberId}`,
          { method: "DELETE" },
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.log(`${errorData.errorType!}: ${errorData.message}`);
        } else {
          console.log("プレイリストから動画を削除しました。");
          router.refresh();
        }
      };

      const close = () => {
        modalOption.closeModal();
      };

      return whichModalIsOpen === modalOption.videoId ? (
        <CheckModal onPassCheck={onPassCheck} close={close} />
      ) : null;
    }
    case "deletePlaylist": {
      const onPassCheck = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${modalOption.ownerId}/playlists/id/${modalOption.playlistId}`,
          { method: "DELETE" },
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.log(`${errorData.errorType!}: ${errorData.message}`);
        } else {
          console.log("プレイリストを削除しました。");
          router.refresh();
        }
      };

      const close = () => {
        modalOption.closeModal();
      };

      return whichModalIsOpen === modalOption.playlistId ? (
        <CheckModal onPassCheck={onPassCheck} close={close} />
      ) : null;
    }

    case "edit": {
      const onPassCheck = async (newTitle: string) => {
        console.log(modalOption);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${modalOption.ownerId}/playlists/id/${modalOption.playlistId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ newTitle }),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.log(`${errorData.errorType!}: ${errorData.message}`);
        } else {
          console.log("プレイリストタイトルを更新しました。");
          modalOption.closeModal();
          router.refresh();
        }
      };

      const close = () => {
        modalOption.closeModal();
      };

      return whichModalIsOpen === modalOption.playlistId ? (
        <EditModal onPassCheck={onPassCheck} close={close} />
      ) : null;
    }
    case "addFavorite": {
      const onPassCheck = async (addPlaylistIds: string[]) => {
        const bodyObj = {
          videoId: modalOption.videoId,
          playlistIds: addPlaylistIds,
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/users/${modalOption.ownerId}/playlists/videos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyObj),
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.log(`${errorData.errorType!}: ${errorData.message}`);
        } else {
          const resData = await res.json();
          console.log(resData.message);
          modalOption.closeModal();
          router.refresh();
        }
      };

      const close = () => modalOption.closeModal();

      return whichModalIsOpen === modalOption.videoId ? (
        <FavoriteModal
          onPassCheck={onPassCheck}
          close={close}
          playlists={modalOption.playlists}
        />
      ) : null;
    }
    case "password": {
      const onPassCheck = () => {
        setIsOpen(false);
      };

      const close = () => {
        router.push("/");
      };

      return isOpen ? (
        <PasswordModal onPassCheck={onPassCheck} close={close} />
      ) : null;
    }
  }
};

export default ModalWrapper;
