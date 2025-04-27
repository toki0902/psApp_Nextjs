import React, { ReactElement } from "react";

const CardMenu = ({
  cardMenu,
  onMouseEnter,
  close,
}: {
  cardMenu: (ReactElement | null)[] | null;
  onMouseEnter: () => void;
  close: (() => void) | undefined;
}) => {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50 lg:hidden"
        onClick={close}
        onMouseEnter={onMouseEnter}
      />
      <div
        onMouseEnter={onMouseEnter}
        className="animate-toUp-in fixed bottom-0 right-0 z-30 w-screen space-y-3 overflow-hidden rounded-t-xl bg-red py-3 text-base text-back lg:absolute lg:top-full lg:h-fit lg:w-48 lg:animate-none lg:space-y-0 lg:rounded-lg lg:border lg:border-red lg:bg-back lg:py-0 lg:text-sm lg:text-red"
      >
        <div className="relative ml-2 h-6 w-6 lg:hidden" onClick={close}>
          <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-back"></span>
          <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-back"></span>
        </div>
        {cardMenu}
      </div>
    </>
  );
};

export default CardMenu;
