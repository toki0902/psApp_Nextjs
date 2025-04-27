"use client";
import React, { useState, createContext } from "react";
import PasswordModal from "./PasswordModal";
import CheckModal from "./CheckModal";
import EditModal from "./EditModal";
import FavoriteModal from "./FavoriteModal";
import { playlist } from "../../types/playlist";

type ModalDefinitionMap = {
  password: {
    component: typeof PasswordModal;
    payload: undefined;
  };
  deletePlaylist: {
    component: typeof CheckModal;
    payload: undefined;
  };
  deleteFromPlaylist: {
    component: typeof CheckModal;
    payload: undefined;
  };
  edit: {
    component: typeof EditModal;
    payload: undefined;
  };
  share: {
    component: typeof CheckModal;
    payload: undefined;
  };
  addFavorite: {
    component: typeof FavoriteModal;
    payload: { playlists: playlist[] };
  };
};

type ModalPayload<T extends ModalType> = ModalDefinitionMap[T]["payload"];

type ModalType = keyof ModalDefinitionMap;

type ModalInfoType = {
  [K in ModalType]: ModalPayload<K> extends undefined
    ? { type: K }
    : { type: K; payload: ModalPayload<K> };
}[ModalType];

type ModalContextType = {
  openModal: {
    <T extends ModalType>(
      modalType: T,
      payload: ModalPayload<T>,
    ): Promise<boolean>;
    <T extends ModalType>(modalType: T): Promise<boolean>;
  };
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoType | null>(null);
  const [resolver, setResolver] = useState<{
    resolve: (result: boolean) => void;
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

    return new Promise<boolean>((resolve) => {
      setResolver({ resolve });
    });
  };

  const onPass = () => {
    resolver?.resolve(true);
    cleanup();
  };

  const onCancel = () => {
    resolver?.resolve(false);
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
