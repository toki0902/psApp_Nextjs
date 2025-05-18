import { Video } from "@/src/backend/domain/entities/Video";
import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import Fuse from "fuse.js";
import { auth } from "../../interface/auth/auth";
import { endOfMonth, startOfMonth } from "date-fns";

export class FindVideosByKeyword {
  constructor(
    private _searchGateway: ISearchGateway,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (keyword: string, isAllVideo: boolean): Promise<Video[]> => {
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

    let targetVideos = [...allUploadedVideos];

    const session = await auth();
    const graduationYear =
      session?.graduationYear || new Date().getMonth() > 4
        ? new Date().getFullYear() + 1
        : new Date().getFullYear();

    const startDate = startOfMonth(new Date(graduationYear - 4, 3));
    const endDate = endOfMonth(new Date(graduationYear, 3));

    if (!isAllVideo) {
      targetVideos = targetVideos.filter(
        (video) => video.publishedAt > startDate && video.publishedAt < endDate,
      );
    }

    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.4,
      distance: 100,
    };

    const fuse = new Fuse(targetVideos, fuseOptions);

    const results = fuse.search(keyword);

    const searchedVideos = results
      .map((result) => result.item)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    console.log(`hit ${searchedVideos.length} videos`);

    return searchedVideos;
  };
}
