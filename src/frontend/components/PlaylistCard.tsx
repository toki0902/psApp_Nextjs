"use client";
import React, { useEffect, useState } from "react";
import {
  CardMenuOption,
  modalOption,
  playlist,
  video,
} from "../types/playlist";
import ModalWrapper from "./ModalWrapper";

type Props = {
  playlistTitle: string;
  videos: { video: video; videoMemberId: number }[];
  playlistId: string;
  ownerId: string;
  createdAt: string;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
  isOpenModal?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
};

const PlaylistCard = ({
  playlistTitle,
  playlistId,
  videos,
  ownerId,
  createdAt,
  whichMenuIsOpen,
  openMenu,
  closeMenu,
  cardMenuOption,
  isOpenModal,
  openModal,
  closeModal,
}: Props) => {
  const onClickMenu: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === playlistId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(playlistId);
      // if (closeMenu) setTimeout(closeMenu, 5000);
    }
  };

  const cardMenu = cardMenuOption
    ? Object.keys(cardMenuOption)
        .sort()
        .map((option) => {
          switch (option) {
            case "edit":
              return (
                <div className="w-full flex px-2 py-1 hover:text-back hover:bg-red group">
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] bg-no-repeat bg-center aspect-square bg-[url('/images/edit_823A42.svg')] group-hover:bg-[url('/images/edit_f1EBE5.svg')] group-hover:animate-shake"
                  ></div>
                  <p className="w-[90%] px-2">編集する</p>
                </div>
              );
            case "deletePlaylist":
              return (
                <div
                  className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
                  onClick={openModal}
                >
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] bg-no-repeat bg-center aspect-square bg-[url('/images/delete_823A42.svg')] group-hover:bg-[url('/images/delete_f1EBE5.svg')] group-hover:animate-shake"
                  ></div>
                  <p className="w-[90%] px-2">{playlistTitle}を削除する</p>
                </div>
              );
          }
        })
    : null;

  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setThumbnail(videos[randomIndex].video.thumbnail);
  }, []);

  let modalOption: modalOption | null = null;

  if (isOpenModal && closeModal) {
    modalOption = {
      type: "deletePlaylist",
      playlistId,
      ownerId,
      isOpenModal,
      closeModal,
    };
  }

  return (
    <>
      <a
        href={`/users/${ownerId}/playlists/${playlistTitle}`}
        className="4xl:w-sixth-divided 3xl:w-fifth-divided 2xl:w-fourth-divided lg:w-third-divided sm:w-half-divided mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg"
      >
        <div className="w-full aspect-[16/9]">
          <img
            src={thumbnail}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full p-2 flex">
          <div className="w-[88%] h-full">
            <p className="line-clamp-3">{playlistTitle}</p>
          </div>
          <div className="w-[12%] flex justify-center items-start">
            <div
              onClick={onClickMenu}
              className="w-2/3 aspect-square relative flex flex-col items-center justify-center rounded-full border border-transparent hover:border-red"
            >
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              {whichMenuIsOpen === playlistId && (
                <div className="absolute top-full space-y-1 right-0 rounded-lg overflow-hidden bg-back w-48 border border-red text-xs text-red z-30">
                  {cardMenu}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
      {modalOption ? <ModalWrapper modalOption={modalOption} /> : null}
    </>
  );
};

export default PlaylistCard;
