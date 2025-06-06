"use client";
import React, { cloneElement, ReactNode, useState } from "react";
import { playlist } from "../../types/playlist";
import { CardMenuOption } from "../../types/cardMenu";

type CardProps = {
  whichMenuIsOpen: string | null;
  openMenu: (key: string) => void;
  closeMenu: () => void;
  whichModalIsOpen: string | null;
  ownerPlaylist: playlist;
  playlists: playlist[];
  cardMenuOption: CardMenuOption;
  userId: string;
};

const CardWrapper = ({
  children,
  cardMenuOption,
  playlists,
  ownerPlaylist,
  userId,
}: {
  children: ReactNode;
  cardMenuOption: CardMenuOption;
  playlists: playlist[];
  ownerPlaylist?: playlist;
  userId?: string;
}) => {
  const [whichMenuIsOpen, setWhichMenuIsOpen] = useState<string | null>(null);

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
        openMenu,
        closeMenu,
        ownerPlaylist,
        playlists,
        cardMenuOption,
        userId,
      });
    }

    return child;
  });

  return clones;
};

export default CardWrapper;
