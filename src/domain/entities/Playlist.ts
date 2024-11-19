import { Video } from "./Video";

export class Playlist {
  constructor(
    public playlistId: string,
    public videos: { videoMemberId: number; video: Video }[],
    public title: string,
    public createdAt: string,
    //一時的にnumber
    public ownerId: number
  ) {}
}
