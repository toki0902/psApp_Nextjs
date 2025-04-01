import { Session } from "next-auth";

export type playlist = {
  videos: { video: video; videoMemberId: number }[];
  title: string;
  playlistId: string;
  ownerId: string;
  createdAt: string;
};

export type CardMenuOption = {
  addToPlaylist?: true;
  share?: true;
  edit?: true;
  deleteFromPlaylist?: true;
  deletePlaylist?: true;
};

export type modalOption =
  | {
      type: "password";
      initialOpenModal: boolean;
    }
  | {
      type: "deletePlaylist";
      playlistId: string;
      isOpenModal: boolean;
      closeModal: () => void;
      ownerId: string;
    };

export type video = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
};
