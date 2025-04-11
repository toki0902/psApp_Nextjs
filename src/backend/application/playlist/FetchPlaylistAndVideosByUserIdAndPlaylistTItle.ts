import { NotFoundError } from "@/src/app/error/errors";
import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";

export class FetchPlaylistAndVideosByUserIdAndPlaylistTitle {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
    private _searchGateway: ISearchGateway,
  ) {}

  run = async (userId: string, playlistTitle: string): Promise<Playlist> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
        playlistTitle,
        userId,
      );

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    const playlistMemberObj =
      await this._playlistRepository.fetchPlaylistMemberByPlaylistId(
        playlistData.playlistId,
      );

    if (!playlistMemberObj) {
      return new Playlist(
        playlistData.playlistId,
        [],
        playlistData.title,
        playlistData.createdAt,
        playlistData.ownerId,
      );
    }

    const cacheId = await this._videoRepository.fetchValidCacheId();

    let arr_videoInfo;
    if (!cacheId) {
      const accessToken = await this._searchGateway.fetchAccessToken();
      const videos = await this._searchGateway.fetchVideoByVideoIds(
        playlistMemberObj.map((i) => i.videoId),
        accessToken,
      );
      const memberIds = playlistMemberObj.map((obj) => obj.memberId);
      arr_videoInfo = memberIds.map((id, index) => {
        return {
          videoMemberId: id,
          video: { ...videos[index], url: videos[index].url },
        };
      });
    } else {
      const videos =
        await this._videoRepository.fetchVideoByYoutubeIdsAndCacheId(
          playlistMemberObj.map((i) => i.videoId),
          cacheId,
        );
      const memberIds = playlistMemberObj.map((i) => i.memberId);
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
      playlistData.ownerId,
    );
  };
}
