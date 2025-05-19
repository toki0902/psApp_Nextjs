import { ISearchGateway } from "../../domain/dataAccess/gateways/ISearchGateway";
import { IVideoRepository } from "../../domain/dataAccess/repository/IVideoRepository";

export class SyncYoutubeVideos {
  constructor(
    private _videoRepository: IVideoRepository,
    private _youtubeGateway: ISearchGateway,
  ) {}
  run = async (): Promise<void> => {
    const accessToken = await this._youtubeGateway.fetchAccessToken();
    const allUploadedVideos =
      await this._youtubeGateway.fetchAllVideoByAccessToken(accessToken);

    await this._videoRepository.syncVideos(allUploadedVideos);
    return;
  };
}
