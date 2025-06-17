import { Video } from "./Video";

export class Playlist {
  constructor(
    public playlistId: string,
    public videos: { videoMemberId: string; video: Video }[],
    public title: string,
    public createdAt: string,
    public ownerId: string,
  ) {}

  isOwner(userId: string): boolean {
    return this.ownerId === userId;
  }

  hasVideo(videoId: string): boolean {
    return this.videos.some((i) => i.video.videoId === videoId);
  }
}

export class PlaylistSummery {
  constructor(
    public playlistId: string,
    public title: string,
    public createdAt: string,
    public ownerId: string,
  ) {}

  isOwner(userId: string): boolean {
    return this.ownerId === userId;
  }
}
