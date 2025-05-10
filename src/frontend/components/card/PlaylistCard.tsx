"use client";
import React, { useState } from "react";
import { playlist } from "../../types/playlist";
import { CardMenuNeedData, CardMenuOption } from "../../types/cardMenu";

import CardMenu from "./menu/CardMenu";
import Link from "next/link";

type Props = {
  playlistInfo: playlist;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
};

const PlaylistCard = ({
  playlistInfo,
  whichMenuIsOpen,
  openMenu,
  closeMenu,
  cardMenuOption,
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

  const thumbnail =
    playlistInfo.videos[0]?.video?.thumbnail ||
    "https://placehold.jp/160x90.png";

  let cardMenuNeedData: CardMenuNeedData = {};
  //ここの条件式はcloneElementを使用しているからしゃあない！！
  if (cardMenuOption) cardMenuNeedData = { thisPlaylistInfo: playlistInfo };

  return (
    <>
      <Link
        href={`/users/${playlistInfo.ownerId}/playlists/${playlistInfo.title}`}
        className="mx-[calc(0.5%)] mb-10 flex w-full cursor-pointer rounded-lg sm:block sm:w-half-divided lg:w-third-divided 2xl:w-fourth-divided 3xl:w-fifth-divided 4xl:w-sixth-divided"
      >
        <div className="aspect-[16/9] w-1/2 sm:w-full">
          <img
            src={thumbnail}
            alt="image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex w-1/2 p-2 align-middle sm:w-full">
          <div className="flex h-full w-[80%] flex-col justify-center sm:w-[90%]">
            <p className="line-clamp-2 break-all">{playlistInfo.title}</p>
            <p className="text-sm text-blue">
              {playlistInfo.videos.length} 件の動画
            </p>
          </div>
          <div className="flex w-[20%] items-center justify-center sm:w-[10%] sm:items-start">
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
              {whichMenuIsOpen === playlistInfo.playlistId &&
                cardMenuOption && (
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
      </Link>
    </>
  );
};

export default PlaylistCard;
