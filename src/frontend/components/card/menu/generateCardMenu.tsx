"use client";
import { CardMenuOption, MenuDataMap } from "@/src/frontend/types/cardMenu";
import { menuDefinitions } from "./menuDefinitions";
import MenuItem from "./MenuItem";
import { ModalType } from "@/src/frontend/types/modal";

//generateの責任は
//onPass後の処理の定義

export const generateCardMenu = (
  options: CardMenuOption,
  openModal: (id: string, modalType: ModalType) => void,
  cardData: MenuDataMap,
) => {
  const defKeys = Object.keys(options).filter(
    (key): key is keyof typeof menuDefinitions =>
      key in menuDefinitions && options[key as keyof CardMenuOption] === true,
  );

  return defKeys.sort().map((option) => {
    const def = menuDefinitions[option];

    if (!def) return null;
    return (
      <MenuItem
        key={option}
        icon={def.icon}
        hoverIcon={def.hoverIcon}
        text={def.getLabel(cardData)}
        onClick={def.getOnClick(cardData, openModal)}
      />
    );
  });
};
