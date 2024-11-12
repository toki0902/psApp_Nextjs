import { VideoRecord } from "@/src/infrastructure/search/VideoRecord";

export interface ISearchRepository {
  fetchVideoData: (keyword: string) => Promise<VideoRecord[]>;
}
