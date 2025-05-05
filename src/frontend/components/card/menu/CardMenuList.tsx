"use client";
import { CardMenuData } from "@/src/frontend/types/cardMenu";
import { menuDefinitions } from "./menuDefinitions";
import MenuItem from "./MenuItem";
import { useModal } from "@/src/frontend/hooks/useModal";
import { useRouter } from "next/navigation";

type Props = {
  cardData: CardMenuData;
};

//generateの責任は
//onPass後の処理の定義

export const CardMenuList = ({ cardData }: Props) => {
  const openModal = useModal().openModal;
  const router = useRouter();

  const defKeys = Object.keys(cardData).filter(
    (key): key is keyof typeof menuDefinitions => key in menuDefinitions,
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
        onClick={def.getOnClick(cardData, openModal, router)}
      />
    );
  });
};
