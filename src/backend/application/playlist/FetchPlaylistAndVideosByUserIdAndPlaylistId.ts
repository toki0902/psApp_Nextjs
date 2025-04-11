import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";

export class FetchPlaylistAndVideosByUserIdAndPlaylistId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
    private _searchGateway: ISearchGateway,
  ) {}

  run = async (
    userId: string,
    playlistId: string,
  ): Promise<Playlist | undefined> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds([playlistId]);

    if (!playlistData?.length) {
      throw new NotFoundError("playlist is not found");
    }

    if (playlistData[0].ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    const playlistMembersObj =
      await this._playlistRepository.fetchPlaylistMembersByPlaylistIds([
        playlistId,
      ]);

    const playlistMemberObj = playlistMembersObj[0];

    if (!playlistMemberObj.videos.length) {
      return new Playlist(
        playlistData[0].playlistId,
        [],
        playlistData[0].title,
        playlistData[0].createdAt,
        playlistData[0].ownerId,
      );
    }

    const cacheId = await this._videoRepository.fetchValidCacheId();

    let arr_videoInfo;
    if (!cacheId) {
      const accessToken = await this._searchGateway.fetchAccessToken();
      const videos = await this._searchGateway.fetchVideoByVideoIds(
        playlistMemberObj.videos.map((i) => i.videoId),
        accessToken,
      );
      const memberIds = playlistMemberObj.videos.map((obj) => obj.memberId);
      arr_videoInfo = memberIds.map((id, index) => {
        return {
          videoMemberId: id,
          video: { ...videos[index], url: videos[index].url },
        };
      });
    } else {
      const videos =
        await this._videoRepository.fetchVideoByYoutubeIdsAndCacheId(
          playlistMemberObj.videos.map((i) => i.videoId),
          cacheId,
        );
      const memberIds = playlistMemberObj.videos.map((i) => i.memberId);
      arr_videoInfo = memberIds.map((id, index) => {
        return {
          videoMemberId: id,
          video: { ...videos[index], url: videos[index].url },
        };
      });
    }

    return new Playlist(
      playlistData[0].playlistId,
      arr_videoInfo,
      playlistData[0].title,
      playlistData[0].createdAt,
      playlistData[0].ownerId,
    );
  };
}
