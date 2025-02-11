"use client";
import React, { cloneElement, ReactNode, useState } from "react";
import { CardMenuOption } from "../types/playlist";

//todo : gptに頼ったので後から見直せ！！
type CardProps = {
  whichMenuIsOpen: string | null;
  openMenu: (key: string) => void;
  closeMenu: () => void;
  cardMenuOption: CardMenuOption;
};

const CardWrapper = ({
  children,
  cardMenuOption,
}: {
  children: ReactNode;
  cardMenuOption: CardMenuOption;
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
        cardMenuOption,
      });
    }

    return child;
  });

  return clones;
};

export default CardWrapper;
