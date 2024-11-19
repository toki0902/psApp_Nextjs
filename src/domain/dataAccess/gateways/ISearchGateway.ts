import { Video } from "../../entities/Video";

export interface ISearchGateway {
  fetchAccessToken: () => Promise<string>;
  fetchAllVideoByAccessToken: (accessToken: string) => Promise<Video[]>;
  fetchVideoByVideoIds: (
    videoIds: string[],
    accessToken: string
  ) => Promise<Video[]>;
}
