"use client";
import React from "react";

import { playlist, video } from "../../types/playlist";
import { ModalType, modalOption } from "../../types/modal";
import { CardMenuOption, MenuDataMap } from "../../types/cardMenu";
import { useParams } from "next/navigation";
import ModalWrapper from "../modal/ModalWrapper";
import { generateMenuDataMap } from "../../utils/cardMenu";
import { generateCardMenu } from "./menu/generateCardMenu";

type Props = {
  videoInfo: video;
  videoMemberId?: string;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
  modalType?: "deleteFromPlaylist" | "share" | "addFavorite";
  whichModalIsOpen?: string | null;
  openModal?: (id: string, modalType: ModalType) => void;
  closeModal?: () => void;
  playlists?: playlist[];
  ownerPlaylist?: playlist;
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
  playlists,
  ownerPlaylist,
}: Props) => {
  const { userId, playlistTitle } = useParams<{
    userId: string;
    playlistTitle: string;
  }>();
  const onClick: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === videoInfo.videoId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(videoInfo.videoId);
      // if (closeMenu) setTimeout(closeMenu, 5000);
    }
  };

  let cardMenu = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (cardMenuOption && openModal) {
    const cardData: MenuDataMap = generateMenuDataMap(
      cardMenuOption,
      undefined,
      videoInfo
    );

    cardMenu = generateCardMenu(cardMenuOption, openModal, cardData);
  }

  let modalOption: modalOption | null = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (
    modalType &&
    closeModal &&
    whichModalIsOpen &&
    ownerPlaylist &&
    videoMemberId &&
    playlists
  ) {
    switch (modalType) {
      case "deleteFromPlaylist": {
        modalOption = {
          type: modalType,
          playlistId: ownerPlaylist?.playlistId,
          whichModalIsOpen,
          closeModal,
          memberId: videoMemberId,
          ownerId: ownerPlaylist.ownerId,
          videoId: videoInfo.videoId,
        };
        break;
      }
      case "addFavorite": {
        modalOption = {
          type: modalType,
          playlists: playlists,
          videoId: videoInfo.videoId,
          ownerId: ownerPlaylist.ownerId,
          whichModalIsOpen,
          closeModal,
        };
      }
    }
  }

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
      {modalOption ? <ModalWrapper modalOption={modalOption} /> : null}
    </>
  );
};

export default VideoCard;
