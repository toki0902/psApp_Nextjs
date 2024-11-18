import { Video } from "../../entities/Video";

export interface IVideoRepository {
  fetchVideosByCacheId: (cacheId: number) => Promise<Video[]>;
  fetchValidCacheId: () => Promise<number | undefined>;
  insert: (videos: Video[]) => Promise<void>;
}
