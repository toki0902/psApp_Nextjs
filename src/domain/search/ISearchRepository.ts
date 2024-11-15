import { Video } from "../entities/Video";

export interface ISearchRepository {
  fetchAccessToken: () => Promise<string>;
  fetchVideoByAccessToken: (accessToken: string) => Promise<Video[]>;
  filterAndSortVideo: (videos: Video[], keyword: string) => Promise<Video[]>;
}
