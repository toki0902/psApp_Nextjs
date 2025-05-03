"use client";
import React, { useState, createContext } from "react";
import PasswordModal from "./PasswordModal";
import CheckModal from "./CheckModal";
import EditModal from "./EditModal";
import FavoriteModal from "./favoriteModal/FavoriteModal";
import {
  ModalContextType,
  ModalInfoType,
  ModalPayload,
  ModalType,
  ModalDefinitionMap,
} from "../../types/modal";

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoType | null>(null);
  const [resolver, setResolver] = useState<{
    resolve: (result: boolean | string | string[] | null) => void;
  } | null>(null);

  const openModal = <T extends ModalType>(
    modalType: T,
    payload?: ModalPayload<T>,
  ) => {
    setIsOpen(true);

    if (payload === undefined) {
      setModalInfo({ type: modalType } as ModalInfoType);
    } else {
      setModalInfo({ type: modalType, payload } as ModalInfoType);
    }

    return new Promise<ModalDefinitionMap[T]["value"] | null>((resolve) => {
      setResolver({ resolve });
    });
  };

  const onPass = (returnValue?: string | string[]) => {
    resolver?.resolve(returnValue || true);
    cleanup();
  };

  const onCancel = () => {
    resolver?.resolve(null);
    cleanup();
  };

  const cleanup = () => {
    setIsOpen(false);
    setModalInfo(null);
    setResolver(null);
  };

  const MODAL_COMPONENTS: {
    [K in ModalType]: React.ComponentType<any>;
  } = {
    password: PasswordModal,
    deleteFromPlaylist: CheckModal,
    deletePlaylist: CheckModal,
    edit: EditModal,
    share: CheckModal,
    addFavorite: FavoriteModal,
  };

  const ModalComponent = modalInfo ? MODAL_COMPONENTS[modalInfo.type] : null;

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && modalInfo && ModalComponent && (
        <ModalComponent
          onPassCheck={onPass}
          close={onCancel}
          {...(modalInfo.type === "addFavorite"
            ? { playlists: modalInfo.payload.playlists }
            : {})}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
