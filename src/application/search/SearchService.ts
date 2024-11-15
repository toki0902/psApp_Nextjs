import { Video } from "@/src/domain/entities/Video";
import { ISearchRepository } from "@/src/domain/search/ISearchRepository";

export class SearchService {
  constructor(private _searchRepository: ISearchRepository) {}
  findVideosByKeyword = async (keyword: string): Promise<Video[]> => {
    const accessToken = await this._searchRepository.fetchAccessToken();

    const allUploadedVideos =
      await this._searchRepository.fetchVideoByAccessToken(accessToken);

    console.log(allUploadedVideos);

    const searchedVideos = await this._searchRepository.filterAndSortVideo(
      allUploadedVideos,
      keyword
    );

    return searchedVideos;
  };
}
