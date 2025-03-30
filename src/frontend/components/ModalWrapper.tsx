"use client";
import React, { useState } from "react";
import PasswordModal from "./PasswordModal";
import { useRouter } from "next/navigation";
import { modalOption } from "../types/playlist";
import CheckModal from "./CheckModal";

const ModalWrapper = ({ modalOption }: { modalOption: modalOption }) => {
  const { initialModalOpen, type } = modalOption;
  const [isOpen, setIsOpen] = useState<boolean>(initialModalOpen);

  const router = useRouter();

  const close = () => {
    switch (type) {
      case "password":
        router.push("/");
        break;

      case "deletePlaylist":
        setIsOpen(false);
        break;
    }
  };

  const onPassCheck = () => {
    switch (type) {
      case "password":
        setIsOpen(false);
        break;
      case "deletePlaylist":
        console.log("delete!!");
        break;
    }
  };

  return isOpen && type === "password" ? (
    <PasswordModal onCorrect={onPassCheck} close={close}></PasswordModal>
  ) : isOpen && type === "deletePlaylist" ? (
    <CheckModal onPassCheck={onPassCheck} close={close}></CheckModal>
  ) : (
    <></>
  );
};

export default ModalWrapper;
