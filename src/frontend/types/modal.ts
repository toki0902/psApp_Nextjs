import CheckModal from "../components/modal/CheckModal";
import EditModal from "../components/modal/EditModal";
import FavoriteModal from "../components/modal/addFavoriteModal/AddFavoriteModal";
import NotificationModal from "../components/modal/NotificationModal";
import PasswordModal from "../components/modal/PasswordModal";
import { playlist } from "./playlist";
import CreateFavoriteModal from "../components/modal/CreateFavoriteModal";
import AddFavoriteModal from "../components/modal/addFavoriteModal/AddFavoriteModal";

export type ModalDefinitionMap = {
  password: {
    component: typeof PasswordModal;
    payload: undefined;
    value: boolean;
  };
  deletePlaylist: {
    component: typeof CheckModal;
    payload: undefined;
    value: boolean;
  };
  deleteFromPlaylist: {
    component: typeof CheckModal;
    payload: undefined;
    value: boolean;
  };
  edit: {
    component: typeof EditModal;
    payload: undefined;
    value: string;
  };
  share: {
    component: typeof CheckModal;
    payload: undefined;
    value: boolean;
  };
  addFavorite: {
    component: typeof AddFavoriteModal;
    payload: { playlists: playlist[] };
    value: string[];
  };
  createFavorite: {
    component: typeof CreateFavoriteModal;
    payload: undefined;
    value: string;
  };
  notice: {
    component: typeof NotificationModal;
    payload: { message: string; type: "error" | "normal" };
    value: boolean;
  };
};

export type ModalPayload<T extends ModalType> =
  ModalDefinitionMap[T]["payload"];

export type ModalType = keyof ModalDefinitionMap;

export type ModalInfoType = {
  [K in ModalType]: ModalPayload<K> extends undefined
    ? { type: K }
    : { type: K; payload: ModalPayload<K> };
}[ModalType];

export type ModalContextType = {
  openModal: {
    <T extends ModalType>(
      modalType: T,
      ...args: ModalPayload<T> extends undefined
        ? []
        : [payload: ModalPayload<T>]
    ): Promise<ModalDefinitionMap[T]["value"] | null>;
  };
};
