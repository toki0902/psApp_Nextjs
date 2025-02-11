"use client";
import Image from "next/image";
import React from "react";

import Logo from "@/images/favorite_f1EBE5.svg";
import shareIcon from "@/images/share_823A42.svg";
import editIcon from "@/images/edit_823A42.svg";
import deleteIcon from "@/images/delete_823A42.svg";

import { CardMenuOption } from "../types/playlist";

type Props = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
  videoMemberId?: number;
  whichMenuIsOpen?: string | null;
  openMenu?: (key: string) => void;
  closeMenu?: () => void;
  cardMenuOption?: CardMenuOption;
};

const VideoCard = ({
  videoId,
  views,
  url,
  thumbnail,
  title,
  videoMemberId,
  whichMenuIsOpen,
  openMenu,
  closeMenu,
  cardMenuOption,
}: Props) => {
  const cardMenu = cardMenuOption
    ? Object.keys(cardMenuOption)
        .sort()
        .map((option) => {
          switch (option) {
            case "addToPlaylist":
              return (
                <div className="w-full flex px-2 py-1 hover:text-back hover:bg-red group">
                  <div
                    style={{ backgroundSize: "93%" }}
                    className="w-[10%] object-cover bg-no-repeat aspect-square bg-[url('/images/favorite_823A42.svg')] group-hover:bg-[url('/images/favorite_f1EBE5.svg')] bg-center"
                  ></div>
                  <p className="w-[90%] px-2">お気に入りに追加する</p>
                </div>
              );
            case "share":
              return (
                <div className="w-full flex px-2 py-1 group">
                  <Image
                    src={shareIcon}
                    alt="logo"
                    className="w-[9%] group-hover:animate-shake"
                  ></Image>
                  <p className="w-[90%] px-2">共有する</p>
                </div>
              );
            case "edit":
              return (
                <div className="w-full flex px-2 py-1 group">
                  <Image
                    src={editIcon}
                    alt="logo"
                    className="w-[9%] group-hover:animate-shake"
                  ></Image>
                  <p className="w-[90%] px-2">編集する</p>
                </div>
              );
            case "deleteFromPlaylist":
              return (
                <div className="w-full flex px-2 py-1 group">
                  <Image
                    src={deleteIcon}
                    alt="logo"
                    className="w-[10%] group-hover:animate-shake"
                  ></Image>
                  <p className="w-[90%] px-2">「」から削除する</p>
                </div>
              );
            case "deletePlaylist":
              return (
                <div className="w-full flex px-2 py-1 group">
                  <Image
                    src={deleteIcon}
                    alt="logo"
                    className="w-[10%] group-hover:animate-shake"
                  ></Image>
                  <p className="w-[90%] px-2">「」を削除する</p>
                </div>
              );
          }
        })
    : null;

  const onClick: (e: React.MouseEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    if (whichMenuIsOpen === videoId) {
      if (closeMenu) closeMenu();
    } else {
      if (openMenu) openMenu(videoId);
      // if (closeMenu) setTimeout(closeMenu, 5000);
    }
  };
  return (
    <>
      <a
        href={url}
        className="4xl:w-sixth-divided 3xl:w-fifth-divided 2xl:w-fourth-divided lg:w-third-divided sm:w-half-divided mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg transition-all hover:-translate-y-1"
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
            <p className="line-clamp-3">{title}</p>
            <p className="mt-2 text-sm">{views} 回視聴</p>
          </div>
          <div className="w-[12%] flex justify-center items-start">
            <div
              onClick={onClick}
              className="w-2/3 aspect-square relative flex flex-col items-center justify-center rounded-full border border-transparent hover:border-red"
            >
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              <span className="w-1 h-1 bg-red block rounded-full my-[1.5px]"></span>
              {whichMenuIsOpen === videoId && (
                <div className="absolute top-full space-y-1 right-0 rounded-lg overflow-hidden bg-back w-48 border border-red text-xs text-red z-30">
                  {cardMenu}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default VideoCard;
