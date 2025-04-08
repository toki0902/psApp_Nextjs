import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";

export class FetchPlaylistAndVideosByUserIdAndPlaylistId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
    private _searchGateway: ISearchGateway
  ) {}

  run = async (
    userId: string,
    playlistId: string
  ): Promise<Playlist | undefined> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistId(playlistId);

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    if (playlistData.ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    const videoObjs =
      await this._playlistRepository.fetchPlaylistMemberIdsByPlaylistId(
        playlistId
      );

    const cacheId = await this._videoRepository.fetchValidCacheId();

    let arr_videoInfo;
    if (!cacheId) {
      const accessToken = await this._searchGateway.fetchAccessToken();
      const videos = await this._searchGateway.fetchVideoByVideoIds(
        videoObjs.map((i) => i.videoId),
        accessToken
      );
      const memberIds = videoObjs.map((obj) => obj.memberId);
      arr_videoInfo = memberIds.map((id, index) => {
        return {
          videoMemberId: id,
          video: { ...videos[index], url: videos[index].url },
        };
      });
    } else {
      const videos =
        await this._videoRepository.fetchVideoByYoutubeIdsAndCacheId(
          videoObjs.map((i) => i.videoId),
          cacheId
        );
      const memberIds = videoObjs.map((i) => i.memberId);
      arr_videoInfo = memberIds.map((id, index) => {
        return {
          videoMemberId: id,
          video: { ...videos[index], url: videos[index].url },
        };
      });
    }

    return new Playlist(
      playlistData.playlistId,
      arr_videoInfo,
      playlistData.title,
      playlistData.createdAt,
      playlistData.ownerId
    );
  };
}
