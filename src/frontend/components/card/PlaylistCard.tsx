"use client";
import React, { useEffect, useState } from "react";
import { playlist } from "../../types/playlist";
import { CardMenuOption, MenuDataMap } from "../../types/cardMenu";
import { modalOption, ModalType } from "../../types/modal";

import ModalWrapper from "../modal/ModalWrapper";
import { generateCardMenu } from "./menu/generateCardMenu";
import { generateMenuDataMap } from "../../utils/cardMenu";

type Props = {
  playlistInfo: playlist;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
  modalType?: "deletePlaylist" | "edit";
  whichModalIsOpen?: string | null;
  openModal?: (id: string, modalType: ModalType) => void;
  closeModal?: () => void;
};

const PlaylistCard = ({
  playlistInfo,
  whichMenuIsOpen,
  openMenu,
  closeMenu,
  cardMenuOption,
  modalType,
  whichModalIsOpen,
  openModal,
  closeModal,
}: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onClickMenu: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === playlistInfo.playlistId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(playlistInfo.playlistId);
      // if (closeMenu) timer = setTimeout(closeMenu, 5000);
    }
  };

  const thumbnail = playlistInfo.videos[0]?.video?.thumbnail || "";

  let cardMenu = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (cardMenuOption && openModal) {
    const cardData: MenuDataMap = generateMenuDataMap(
      cardMenuOption,
      playlistInfo,
    );
    cardMenu = generateCardMenu(cardMenuOption, openModal, cardData);
  }

  let modalOption: modalOption | null = null;
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (modalType && closeModal && whichModalIsOpen) {
    modalOption = {
      type: modalType,
      playlistId: playlistInfo.playlistId,
      ownerId: playlistInfo.ownerId,
      whichModalIsOpen,
      closeModal,
    };
  }

  return (
    <>
      <a
        href={`/users/${playlistInfo.ownerId}/playlists/${playlistInfo.title}`}
        className="mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg sm:w-half-divided lg:w-third-divided 2xl:w-fourth-divided 3xl:w-fifth-divided 4xl:w-sixth-divided"
      >
        <div className="aspect-[16/9] w-full">
          <img
            src={thumbnail}
            alt="image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full p-2">
          <div className="h-full w-[90%]">
            <p className="line-clamp-3">{playlistInfo.title}</p>
          </div>
          <div className="flex w-[10%] items-start justify-center">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ borderColor: isHovered ? "#823a42" : "transparent" }}
              onClick={onClickMenu}
              className="relative flex aspect-square w-3/4 flex-col items-center justify-center rounded-full border"
            >
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              <span className="my-[1.5px] block h-1 w-1 rounded-full bg-red"></span>
              {whichMenuIsOpen === playlistInfo.playlistId && (
                <div
                  onMouseEnter={() => setIsHovered(false)}
                  className="absolute right-0 top-full z-30 w-48 space-y-1 overflow-hidden rounded-lg border border-red bg-back text-xs text-red"
                >
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
