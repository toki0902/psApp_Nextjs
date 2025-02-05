"use client";
import React, { useEffect, useState } from "react";
import PasswordModal from "./PasswordModal";

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isCookieSet = () => {
    return false;
  };

  useEffect(() => {
    if (!isCookieSet()) {
      setIsOpen(true);
    }
  }, []);

  const onCorrect = () => {
    setIsOpen(false);
  };
  return isOpen ? <PasswordModal onCorrect={onCorrect}></PasswordModal> : <></>;
};

export default ModalWrapper;
