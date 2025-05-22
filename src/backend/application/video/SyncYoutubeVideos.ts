import { Pool } from "mysql2/promise";
import { ISearchGateway } from "../../domain/dataAccess/gateways/ISearchGateway";
import { IVideoRepository } from "../../domain/dataAccess/repository/IVideoRepository";
import { withTransaction } from "../../utils/dbUtils";

export class SyncYoutubeVideos {
  constructor(
    private _videoRepository: IVideoRepository,
    private _youtubeGateway: ISearchGateway,
  ) {}
  run = async (pool: Pool): Promise<void> => {
    await withTransaction(pool, async (conn) => {
      const accessToken = await this._youtubeGateway.fetchAccessToken();
      const allUploadedVideos =
        await this._youtubeGateway.fetchAllVideoByAccessToken(accessToken);

      await this._videoRepository.deleteVideoCache(conn);
      await this._videoRepository.syncVideos(conn, allUploadedVideos);
    });

    return;
  };
}
