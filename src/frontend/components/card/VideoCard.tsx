"use client";
import React, { useState } from "react";

import { playlist, video } from "../../types/playlist";
import { CardMenuNeedData, CardMenuOption } from "../../types/cardMenu";
import CardMenu from "./menu/CardMenu";

import Image from "next/image";

type Props = {
  videoInfo: video;
  videoMemberId?: string;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
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
  playlists,
  ownerPlaylist,
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

  let cardMenuNeedData: CardMenuNeedData = {};
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (cardMenuOption)
    cardMenuNeedData = {
      ownerPlaylistInfo: ownerPlaylist,
      thisVideoInfo: videoInfo,
      memberId: videoMemberId,
      userPlaylistsInfo: playlists,
    };

  return (
    <div
      onClick={() => {
        window.location.href = "youtube://watch?v=abc123";
        setTimeout(() => {
          window.location.href = videoInfo.url;
        }, 100);
      }}
      className={
        ownerPlaylist
          ? "mx-[calc(0.5%)] mb-10 flex w-full cursor-pointer rounded-lg sm:block sm:w-half-divided lg:w-third-divided 2xl:w-fourth-divided 3xl:w-fifth-divided 4xl:w-sixth-divided"
          : "mx-[calc(0.5%)] mb-10 w-full cursor-pointer rounded-lg sm:w-half-divided lg:w-third-divided 2xl:w-fourth-divided 3xl:w-fifth-divided 4xl:w-sixth-divided"
      }
    >
      <div
        className={
          ownerPlaylist
            ? "relative aspect-[16/9] w-1/2 sm:w-full"
            : "relative aspect-[16/9] w-full"
        }
      >
        <Image
          src={videoInfo.thumbnail || "/images/failedImage.svg"}
          alt="videoImage"
          className="rounded-lg object-cover"
          fill
        />
      </div>
      <div
        className={
          ownerPlaylist
            ? "flex w-1/2 p-2 align-middle sm:w-full"
            : "flex w-full p-2"
        }
      >
        <div
          className={
            ownerPlaylist
              ? "flex h-full w-[80%] flex-col justify-center sm:w-[90%]"
              : "flex h-full w-[90%] flex-col justify-center"
          }
        >
          <p className="line-clamp-2">{videoInfo.title}</p>
          <p className="mt-2 text-sm">{videoInfo.views} 回視聴</p>
        </div>
        <div
          className={
            ownerPlaylist
              ? "flex w-[20%] items-center justify-center sm:w-[10%] sm:items-start"
              : "flex w-[10%] items-start justify-center"
          }
        >
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
            {whichMenuIsOpen === videoInfo.videoId && cardMenuOption && (
              <CardMenu
                cardMenuOption={cardMenuOption}
                cardMenuNeedData={cardMenuNeedData}
                onMouseEnter={() => setIsHovered(false)}
                close={closeMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
