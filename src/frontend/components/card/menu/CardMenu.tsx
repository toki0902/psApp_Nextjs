import {
  CardMenuNeedData,
  CardMenuOption,
} from "@/src/frontend/types/cardMenu";
import { generateCardMenuData } from "@/src/frontend/utils/cardMenu";
import React from "react";
import { CardMenuList } from "./CardMenuList";

type Props = {
  cardMenuOption: CardMenuOption;
  cardMenuNeedData: CardMenuNeedData;
  onMouseEnter: () => void;
  close: (() => void) | undefined;
};

const CardMenu = ({
  cardMenuOption,
  cardMenuNeedData,
  onMouseEnter,
  close,
}: Props) => {
  const cardMenuData = generateCardMenuData(cardMenuOption, cardMenuNeedData);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50 lg:hidden"
        onClick={close}
        onMouseEnter={onMouseEnter}
      />
      <div
        onMouseEnter={onMouseEnter}
        className="fixed bottom-0 right-0 z-30 w-screen animate-toUp-in space-y-3 overflow-hidden rounded-t-xl bg-red py-3 text-base text-back lg:absolute lg:top-full lg:h-fit lg:w-60 lg:animate-none lg:space-y-0 lg:rounded-lg lg:border lg:border-red lg:bg-back lg:py-0 lg:text-sm lg:text-red"
      >
        <div className="relative ml-2 h-6 w-6 lg:hidden" onClick={close}>
          <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-back"></span>
          <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-back"></span>
        </div>
        <CardMenuList cardData={cardMenuData} />
      </div>
    </>
  );
};

export default CardMenu;
