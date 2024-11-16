import { Video } from "@/src/domain/entities/Video";
import { ISearchRepository } from "@/src/domain/search/ISearchRepository";

export class SearchService {
  constructor(private _searchRepository: ISearchRepository) {}
  findVideosByKeyword = async (keyword: string): Promise<Video[]> => {
    const accessToken = await this._searchRepository.fetchAccessToken();

    const allUploadedVideos =
      await this._searchRepository.fetchVideoByAccessToken(accessToken);

    const searchedVideos = await this._searchRepository.filterAndSortVideo(
      allUploadedVideos,
      keyword
    );

    console.log(`hit ${searchedVideos.length} videos`);

    return searchedVideos;
  };
}
