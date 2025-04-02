"use client";
import React, { useState } from "react";

import {
  CardMenuOption,
  modalOption,
  ModalType,
  playlist,
  video,
} from "../types/playlist";
import { useParams } from "next/navigation";
import ModalWrapper from "./ModalWrapper";

type Props = {
  videoInfo: video;
  videoMemberId?: number;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  playlists?: playlist[];
  cardMenuOption?: CardMenuOption;
  modalType?: ModalType;
  whichModalIsOpen?: string | null;
  openModal?: (id: string, modalType: ModalType) => void;
  closeModal?: () => void;
};

const VideoCard = ({
  videoInfo,
  videoMemberId,
  whichMenuIsOpen,
  openMenu,
  closeMenu,
  cardMenuOption,
  modalType,
  whichModalIsOpen,
  openModal,
  closeModal,
}: Props) => {
  const { userId, playlistTitle } = useParams<{
    userId: string;
    playlistTitle: string;
  }>();
  const cardMenu = cardMenuOption
    ? Object.keys(cardMenuOption)
        .sort()
        .map((option) => {
          switch (option) {
            case "addToPlaylist":
              return (
                <div
                  key={option}
                  className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
                >
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] object-contain bg-no-repeat aspect-square bg-[url('/images/favorite_823A42.svg')] group-hover:bg-[url('/images/favorite_f1EBE5.svg')] group-hover:animate-shake bg-center"
                  ></div>
                  <p className="w-[90%] px-2">お気に入りに追加する</p>
                </div>
              );
            case "share":
              const onClick = async () => {
                await navigator.clipboard.writeText(videoInfo.url);
              };
              return (
                <div
                  key={option}
                  className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
                  onClick={onClick}
                >
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] bg-no-repeat bg-center aspect-square bg-[url('/images/share_823A42.svg')] group-hover:bg-[url('/images/share_f1EBE5.svg')] group-hover:animate-shake"
                  ></div>
                  <p className="w-[90%] px-2">共有する</p>
                </div>
              );
            case "deleteFromPlaylist":
              return (
                <div
                  key={option}
                  className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
                >
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] bg-no-repeat bg-center aspect-square bg-[url('/images/delete_823A42.svg')] group-hover:bg-[url('/images/delete_f1EBE5.svg')] group-hover:animate-shake"
                  ></div>
                  <p className="w-[90%] px-2">{playlistTitle}から削除する</p>
                </div>
              );
          }
        })
    : null;

  const onClick: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === videoInfo.videoId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(videoInfo.videoId);
      // if (closeMenu) setTimeout(closeMenu, 5000);
    }
  };

  let modalOption: modalOption | null = null;

  //modalOptionを設定しなきゃいけん

  return (
    <>
      <a
        href={videoInfo.url}
        className="4xl:w-sixth-divided 3xl:w-fifth-divided 2xl:w-fourth-divided lg:w-third-divided sm:w-half-divided mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg"
      >
        <div className="w-full aspect-[16/9]">
          <img
            src={videoInfo.thumbnail}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full p-2 flex">
          <div className="w-[88%] h-full">
            <p className="line-clamp-3">{videoInfo.title}</p>
            <p className="mt-2 text-sm">{videoInfo.views} 回視聴</p>
          </div>
          <div className="w-[12%] flex justify-center items-start">
            <div
              onClick={onClick}
              className="w-2/3 aspect-square relative flex flex-col items-center justify-center rounded-full border border-transparent hover:border-red"
            >
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              {whichMenuIsOpen === videoInfo.videoId && (
                <div className="absolute top-full space-y-1 right-0 rounded-lg overflow-hidden bg-back w-48 border border-red text-xs text-red z-30">
                  {cardMenu}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
      <ModalWrapper />
    </>
  );
};

export default VideoCard;
