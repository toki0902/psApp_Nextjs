"use client";
import React, { useEffect, useState } from "react";

type Props = {
  payload: { message: string; type: "error" | "normal" };
  onPassCheck: () => void;
  close: () => void;
};

const NotificationModal = ({ onPassCheck, payload }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
    const animationTimer = setTimeout(() => {
      onPassCheck();
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={
        isOpen
          ? "fixed bottom-10 right-[3%] flex h-fit w-fit max-w-[94%] animate-focus-in-for-notice items-center justify-center space-x-2 rounded-lg border border-red bg-red px-2 py-3 text-back"
          : "fixed bottom-10 right-[3%] flex h-fit w-fit max-w-[94%] animate-blur-out-for-notice items-center justify-center space-x-2 rounded-lg border border-red bg-red px-2 py-3 text-back"
      }
    >
      <p className="whitespace-normal break-words">{payload.message}</p>
      <div className="relative h-5 w-5 cursor-pointer" onClick={onClose}>
        <span className="absolute left-1/2 top-1/2 block h-[1px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-back"></span>
        <span className="absolute left-1/2 top-1/2 block h-[1px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-back"></span>
      </div>
    </div>
  );
};

export default NotificationModal;
