import { Video } from "@/src/backend/domain/entities/Video";
import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import Fuse from "fuse.js";

export class FindVideosByKeyword {
  constructor(
    private _searchGateway: ISearchGateway,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (keyword: string): Promise<Video[]> => {
    const cacheId = await this._videoRepository.fetchValidCacheId();

    let allUploadedVideos;

    if (!cacheId) {
      const accessToken = await this._searchGateway.fetchAccessToken();
      allUploadedVideos =
        await this._searchGateway.fetchAllVideoByAccessToken(accessToken);

      await this._videoRepository.insert(allUploadedVideos);
    } else {
      allUploadedVideos =
        await this._videoRepository.fetchVideosByCacheId(cacheId);
    }

    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.3,
      distance: 100,
    };

    const fuse = new Fuse(allUploadedVideos, fuseOptions);

    const results = fuse.search(keyword);

    const searchedVideos = results
      .map((result) => result.item)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    console.log(`hit ${searchedVideos.length} videos`);

    return searchedVideos;
  };
}
