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
      initialModalOpen: boolean;
    }
  | { type: "deletePlaylist"; initialModalOpen: boolean; id: string };

export type video = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
};
