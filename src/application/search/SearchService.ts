import { Video } from "@/src/domain/entities/Video";
import { ISearchRepository } from "@/src/domain/search/ISearchRepository";

export class SearchService {
  constructor(private _searchRepository: ISearchRepository) {}
  findVideosByKeyword = async (keyword: string): Promise<Video[]> => {
    return this._searchRepository.fetchVideoData(keyword);
  };
}
