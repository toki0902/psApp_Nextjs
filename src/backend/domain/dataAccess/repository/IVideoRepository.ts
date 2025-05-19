import { Video } from "../../entities/Video";

export interface IVideoRepository {
  fetchVideos: () => Promise<Video[]>;
  insert: (videos: Video[]) => Promise<void>;
  syncVideos: (videos: Video[]) => Promise<void>;
  fetchVideoByYoutubeIds: (ids: string[]) => Promise<Video[]>;
}
