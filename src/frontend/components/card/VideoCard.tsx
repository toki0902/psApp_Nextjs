"use client";
import React, { useState } from "react";

import { playlist, video } from "../../types/playlist";
import { ModalType, modalOption } from "../../types/modal";
import { CardMenuOption, MenuDataMap } from "../../types/cardMenu";
import ModalWrapper from "../modal/ModalWrapper";
import { generateMenuDataMap } from "../../utils/cardMenu";
import { generateCardMenu } from "./menu/generateCardMenu";
import CardMenu from "./menu/CardMenu";

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
  userId?: string;
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
  userId,
}: Props) => {
  //cardMenuにhoverした時にmenu開くボタンのborderを閉じるためのState
  const [isHovered, setIsHovered] = useState(false);

  const onClick: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === videoInfo.videoId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(videoInfo.videoId);
      // if (closeMenu) timer = setTimeout(closeMenu, 5000);
    }
  };

  let cardMenu = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (cardMenuOption && openModal) {
    const cardData: MenuDataMap = generateMenuDataMap(
      cardMenuOption,
      undefined,
      videoInfo,
    );

    cardMenu = generateCardMenu(cardMenuOption, openModal, cardData);
  }

  let modalOption: modalOption | null = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  switch (modalType) {
    case "deleteFromPlaylist": {
      if (
        modalType &&
        closeModal &&
        whichModalIsOpen &&
        ownerPlaylist &&
        videoMemberId &&
        playlists
      ) {
        modalOption = {
          type: modalType,
          playlistId: ownerPlaylist?.playlistId,
          whichModalIsOpen,
          closeModal,
          memberId: videoMemberId,
          ownerId: ownerPlaylist.ownerId,
          videoId: videoInfo.videoId,
        };
      }
      break;
    }
    case "addFavorite": {
      if (playlists && whichModalIsOpen && closeModal && userId)
        modalOption = {
          type: modalType,
          playlists: playlists,
          videoId: videoInfo.videoId,
          ownerId: userId,
          whichModalIsOpen,
          closeModal,
        };
    }
  }

  return (
    <>
      <a
        href={videoInfo.url}
        className="mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg sm:w-half-divided lg:w-third-divided 2xl:w-fourth-divided 3xl:w-fifth-divided 4xl:w-sixth-divided"
      >
        <div className="aspect-[16/9] w-full">
          <img
            src={videoInfo.thumbnail}
            alt="image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full p-2">
          <div className="flex h-full w-[90%] flex-col items-start justify-center">
            <p className="line-clamp-3">{videoInfo.title}</p>
            <p className="mt-2 text-sm">{videoInfo.views} 回視聴</p>
          </div>
          <div className="flex w-[10%] items-start justify-center">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ borderColor: isHovered ? "#823a42" : "transparent" }}
              onClick={onClick}
              className="relative flex aspect-square w-3/4 flex-col items-center justify-center rounded-full border"
            >
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              {whichMenuIsOpen === videoInfo.videoId && (
                <CardMenu
                  cardMenu={cardMenu}
                  onMouseEnter={() => setIsHovered(false)}
                  close={closeMenu}
                />
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
