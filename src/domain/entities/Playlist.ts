import { Video } from "./Video";

export class Playlist {
  constructor(
    public playlistId: string,
    public videos: Video[],
    public title: string,
    public createdAt: Date
  ) {}
}
