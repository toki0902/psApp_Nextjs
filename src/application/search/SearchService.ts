import { Video } from "@/src/domain/entities/Video";
import { ISearchRepository } from "@/src/domain/search/ISearchRepository";

export class SearchService {
  constructor(private _searchRepository: ISearchRepository) {}
  findVideosByKeyword = async (keyword: string): Promise<Video[]> => {
    const accessToken = await this._searchRepository.fetchAccessToken();

    const youtubeVideos = await this._searchRepository.fetchVideoByAccessToken(
      accessToken,
      keyword
    );

    return youtubeVideos;
  };
}
