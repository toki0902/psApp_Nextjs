"use client";
import React, { cloneElement, ReactNode, useState } from "react";
import { CardMenuOption, playlist } from "../types/playlist";

//todo : gptに頼ったので後から見直せ！！
type CardProps = {
  whichMenuIsOpen: string | null;
  openMenu: (key: string) => void;
  closeMenu: () => void;
  playlists: playlist[];
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [whichMenuIsOpen, setWhichMenuIsOpen] = useState<string | null>(null);

  const openMenu = (key: string) => {
    setWhichMenuIsOpen(key);
  };

  const closeMenu = () => {
    setWhichMenuIsOpen(null);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const clones = React.Children.map(children, (child) => {
    if (React.isValidElement<CardProps>(child)) {
      return cloneElement(child, {
        whichMenuIsOpen,
        openMenu,
        closeMenu,
        isOpenModal,
        openModal,
        closeModal,
        playlists,
        cardMenuOption,
      });
    }

    return child;
  });

  return clones;
};

export default CardWrapper;
