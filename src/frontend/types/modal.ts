import { playlist } from "./playlist";

export type ModalType =
  | "password"
  | "deletePlaylist"
  | "edit"
  | "deleteFromPlaylist"
  | "addFavorite"
  | "share";

export type modalOption =
  | {
      type: "password";
      initialOpenModal: boolean;
    }
  | {
      type: "deletePlaylist";
      playlistId: string;
      whichModalIsOpen: string | null;
      closeModal: () => void;
      ownerId: string;
    }
  | {
      type: "edit";
      playlistId: string;
      whichModalIsOpen: string | null;
      closeModal: () => void;
      ownerId: string;
    }
  | {
      type: "deleteFromPlaylist";
      playlistId: string;
      whichModalIsOpen: string | null;
      closeModal: () => void;
      ownerId: string;
      memberId: string;
    }
  | {
      type: "addFavorite";
      playlists: playlist[];
      whichModalIsOpen: string | null;
      closeModal: () => void;
      videoId: string;
      ownerId: string;
    };
