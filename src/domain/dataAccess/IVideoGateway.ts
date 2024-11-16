import { Video } from "../entities/Video";

export interface IVideoGateway {
  fetchVideosByCacheId: (cacheId: number) => Promise<Video[]>;
  fetchValidCacheId: () => Promise<number | undefined>;
}
