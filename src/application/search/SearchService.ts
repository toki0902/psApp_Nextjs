import { Video } from "@/src/domain/entities/Video";
import { ISearchRepository } from "@/src/domain/dataAccess/gateways/ISearchGateway";
import { IVideoRepository } from "@/src/domain/dataAccess/repository/IVideoRepository";
import Fuse from "fuse.js";

export class SearchService {
  constructor(
    private _searchRepository: ISearchRepository,
    private _videoRepository: IVideoRepository
  ) {}
  findVideosByKeyword = async (keyword: string): Promise<Video[]> => {
    const accessToken = await this._searchRepository.fetchAccessToken();

    const cacheId = await this._videoRepository.fetchValidCacheId();

    let allUploadedVideos;

    if (!cacheId) {
      allUploadedVideos = await this._searchRepository.fetchVideoByAccessToken(
        accessToken
      );

      await this._videoRepository.insert(allUploadedVideos);
    } else {
      allUploadedVideos = await this._videoRepository.fetchVideosByCacheId(
        cacheId
      );
    }

    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.5,
      distance: 100,
    };

    const fuse = new Fuse(allUploadedVideos, fuseOptions);

    const results = fuse.search(keyword);

    const searchedVideos = results.map((result) => result.item);

    console.log(`hit ${searchedVideos.length} videos`);

    return searchedVideos;
  };
}
