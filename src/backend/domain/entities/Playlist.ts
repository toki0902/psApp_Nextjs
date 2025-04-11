import { Video } from "./Video";

export class Playlist {
  constructor(
    public playlistId: string,
    public videos: { videoMemberId: string; video: Video }[],
    public title: string,
    public createdAt: string,
    public ownerId: string,
  ) {}
}
