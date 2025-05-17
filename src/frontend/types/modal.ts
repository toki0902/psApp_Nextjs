import CheckModal from "../components/modal/CheckModal";
import EditModal from "../components/modal/EditModal";
import NotificationModal from "../components/modal/NotificationModal";
import PasswordModal from "../components/modal/PasswordModal";
import { playlist } from "./playlist";
import CreateFavoriteModal from "../components/modal/CreateFavoriteModal";
import AddFavoriteModal from "../components/modal/addFavoriteModal/AddFavoriteModal";
import UpdateProfileModal from "../components/modal/UpdateProfileModal";

export type ModalDefinitionMap = {
  password: {
    component: typeof PasswordModal;
    payload: undefined;
    value: boolean;
    props: {
      onPassCheck: () => void;
      close: () => void;
      payload: undefined;
    };
  };
  deletePlaylist: {
    component: typeof CheckModal;
    payload: undefined;
    value: boolean;
    props: {
      onPassCheck: () => void;
      close: () => void;
      payload: undefined;
    };
  };
  deleteFromPlaylist: {
    component: typeof CheckModal;
    payload: undefined;
    value: boolean;
    props: {
      onPassCheck: () => void;
      close: () => void;
      payload: undefined;
    };
  };
  edit: {
    component: typeof EditModal;
    payload: undefined;
    value: string;
    props: {
      onPassCheck: (newTitle: string) => void;
      close: () => void;
      payload: undefined;
    };
  };
  addFavorite: {
    component: typeof AddFavoriteModal;
    payload: { playlists: playlist[] };
    value: string[];
    props: {
      onPassCheck: (addPlaylistIds: string[]) => void;
      close: () => void;
      payload: { playlists: playlist[] };
    };
  };
  createFavorite: {
    component: typeof CreateFavoriteModal;
    payload: undefined;
    value: string;
    props: {
      onPassCheck: (newTitle: string) => void;
      close: () => void;
      payload: undefined;
    };
  };
  notice: {
    component: typeof NotificationModal;
    payload: { message: string; type: "error" | "normal" };
    value: boolean;
    props: {
      onPassCheck: () => void;
      close: () => void;
      payload: { message: string; type: "error" | "normal" };
    };
  };
  updateProfileModal: {
    component: typeof UpdateProfileModal;
    payload: undefined;
    value: { name: string | null; graduationYear: number | null };
    props: {
      onPassCheck: (arg: {
        name: string | null;
        graduationYear: number | null;
      }) => void;
      close: () => void;
      payload: undefined;
    };
  };
};

export type allValue =
  | boolean
  | string
  | string[]
  | { name: string | null; graduationYear: number | null };

export type returnValue<T extends ModalType> = ModalDefinitionMap[T]["value"];

export type ModalProps<T extends ModalType> = ModalDefinitionMap[T]["props"];

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
