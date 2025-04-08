"use client";
import React from "react";
import { CardMenuOption } from "../../types/cardMenu";
import { MenuDataMap } from "../../types/cardMenu";

const MenuItem = ({
  icon,
  hoverIcon,
  text,
  onClick,
}: {
  icon: string;
  hoverIcon: string;
  text: string;
  onClick: () => void;
}) => {
  const classname = `w-[10%] bg-no-repeat bg-center aspect-square bg-[url('${icon}')] group-hover:bg-[url('${hoverIcon}')] group-hover:animate-shake`;
  return (
    <div
      className="w-full flex px-2 py-1 hover:text-back hover:bg-red group"
      onClick={onClick}
    >
      <div style={{ backgroundSize: "93%" }} className={classname} />
      <p className="w-[90%] px-2">{text}</p>
    </div>
  );
};

const menuDefinitions = {
  edit: {
    icon: "/images/edit_823A42.svg",
    hoverIcon: "/images/edit_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => "編集する",
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, option: string) => void
    ) => {
      if (data.edit) {
        const playlistId = data.edit.playlistId;
        return () => openModal(playlistId, "edit");
      } else return () => {};
    },
  },
  deletePlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => `${data.deletePlaylist?.title}を削除する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, option: string) => void
    ) => {
      if (data.deletePlaylist) {
        const playlistId = data.deletePlaylist.playlistId;
        return () => openModal(playlistId, "deletePlaylist");
      } else return () => {};
    },
  },
  addToPlaylist: {
    icon: "/images/favorite_823A42.svg",
    hoverIcon: "/images/favorite_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => `お気に入りに追加する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, option: string) => void
    ) => {
      if (data.addToPlaylist) {
        const videoId = data.addToPlaylist.videoId;
        return () => openModal(videoId, "addToPlaylist");
      } else return () => {};
    },
  },
  share: {
    icon: "/images/share_823A42.svg",
    hoverIcon: "/images/share_f1EBE5.svg",
    getLabel: () => `共有する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, option: string) => void
    ) => {
      if (data.share) {
        const videoId = data.share.videoId;
        return () => openModal(videoId, "share");
      } else return () => {};
    },
  },
  deleteFromPlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: MenuDataMap) =>
      `${data.deleteFromPlaylist?.playlist.title}から削除する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, option: string) => void
    ) => {
      if (data.deleteFromPlaylist) {
        const videoId = data.deleteFromPlaylist.video.videoId;
        return () => openModal(videoId, "deleteFromPlaylist");
      } else return () => {};
    },
  },
} as const;

const generateCardMenu = (
  options: CardMenuOption,
  openModal: (id: string, option: string) => void,
  cardData: MenuDataMap
) => {
  const defKeys = Object.keys(options).filter(
    (key): key is keyof typeof cardData => key in cardData
  );

  return defKeys.sort().map((option) => {
    const def = menuDefinitions[option];

    if (!def) return null;
    return (
      <MenuItem
        icon={def.icon}
        hoverIcon={def.hoverIcon}
        text={def.getLabel(cardData)}
        onClick={def.getOnClick(cardData, openModal)}
      />
    );
  });
};

export default MenuItem;
