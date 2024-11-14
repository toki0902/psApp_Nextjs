import { Video } from "../entities/Video";

export interface ISearchRepository {
  fetchAccessToken: () => Promise<string>;
  fetchVideoByAccessToken: (
    accessToken: string,
    keyword: string
  ) => Promise<Video[]>;
}
