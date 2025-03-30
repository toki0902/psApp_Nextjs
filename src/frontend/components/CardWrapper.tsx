"use client";
import React, { cloneElement, ReactNode, useState } from "react";
import { CardMenuOption, playlist } from "../types/playlist";

//todo : gptに頼ったので後から見直せ！！
type CardProps = {
  whichMenuIsOpen: string | null;
  openMenu: (key: string) => void;
  closeMenu: () => void;
  playlists: playlist[];
  openPlaylist: () => void;
  closePlaylist: () => void;
  isOpenPlaylist: boolean;
  cardMenuOption: CardMenuOption;
};

const CardWrapper = ({
  children,
  cardMenuOption,
  playlists,
}: {
  children: ReactNode;
  cardMenuOption: CardMenuOption;
  playlists?: playlist[];
}) => {
  const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);
  const [whichMenuIsOpen, setWhichMenuIsOpen] = useState<string | null>(null);

  const openPlaylist = () => {
    setIsOpenPlaylist(true);
  };

  const closePlaylist = () => {
    setIsOpenPlaylist(false);
  };

  const openMenu = (key: string) => {
    setWhichMenuIsOpen(key);
  };

  const closeMenu = () => {
    setWhichMenuIsOpen(null);
  };

  const clones = React.Children.map(children, (child) => {
    if (React.isValidElement<CardProps>(child)) {
      return cloneElement(child, {
        whichMenuIsOpen,
        isOpenPlaylist,
        openMenu,
        closeMenu,
        playlists,
        openPlaylist,
        closePlaylist,
        cardMenuOption,
      });
    }

    return child;
  });

  return clones;
};

export default CardWrapper;
