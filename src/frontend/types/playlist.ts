export type playlist = {
  videos: { video: video; videoMemberId: string }[];
  title: string;
  playlistId: string;
  ownerId: string;
  createdAt: string;
};

export type video = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
};
