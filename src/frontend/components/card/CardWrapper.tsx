"use client";
import React, { cloneElement, ReactNode, useState } from "react";
import { playlist } from "../../types/playlist";
import { ModalType } from "../../types/modal";
import { CardMenuOption } from "../../types/cardMenu";

//todo : gptに頼ったので後から見直せ！！
type CardProps = {
  whichMenuIsOpen: string | null;
  openMenu: (key: string) => void;
  closeMenu: () => void;
  playlists: playlist[];
  whichModalIsOpen: string | null;
  modalType: ModalType;
  openModal: (playlistId: string, modalType: ModalType) => void;
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
  const [whichModalIsOpen, setWhichModalIsOpen] = useState<string | null>(null);
  const [whichMenuIsOpen, setWhichMenuIsOpen] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>("deletePlaylist");

  const openMenu = (key: string) => {
    setWhichMenuIsOpen(key);
  };

  const closeMenu = () => {
    setWhichMenuIsOpen(null);
  };

  const openModal = (id: string, modalType: ModalType) => {
    setModalType(modalType);
    setWhichModalIsOpen(id);
  };

  const closeModal = () => {
    setWhichModalIsOpen(null);
  };

  const clones = React.Children.map(children, (child) => {
    if (React.isValidElement<CardProps>(child)) {
      return cloneElement(child, {
        whichMenuIsOpen,
        openMenu,
        closeMenu,
        whichModalIsOpen,
        modalType,
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
