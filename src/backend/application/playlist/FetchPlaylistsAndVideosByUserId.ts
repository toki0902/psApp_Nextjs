import { ISearchGateway } from "@/src/backend/domain/dataAccess/gateways/ISearchGateway";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Video } from "@/src/backend/domain/entities/Video";

export class FetchPlaylistsAndVideosByUserId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
    private _searchGateway: ISearchGateway
  ) {}

  run = async (userId: string): Promise<Playlist[]> => {
    const arr_playlistData =
      await this._playlistRepository.fetchPlaylistByUserId(userId);

    if (!arr_playlistData.length) {
      return [];
    }

    const playlistIds = arr_playlistData.map((item) => item.playlistId);

    const arr_playlistMemberData = await Promise.all(
      playlistIds.map(
        async (id) =>
          await this._playlistRepository.fetchPlaylistMemberIdsByPlaylistId(id)
      )
    );

    const cacheId = await this._videoRepository.fetchValidCacheId();
    let arr_videos: { video: Video; videoMemberId: number }[][];

    if (!cacheId) {
      const accessToken = await this._searchGateway.fetchAccessToken();
      arr_videos = await Promise.all(
        arr_playlistMemberData.map(async (data) => {
          const youtubeIds = data.map((data) => data.videoId);
          const memberIds = data.map((data) => data.memberId);
          const videos = await this._searchGateway.fetchVideoByVideoIds(
            youtubeIds,
            accessToken
          );
          return memberIds.map((memberId, index) => {
            return { video: videos[index], videoMemberId: memberId };
          });
        })
      );
    } else {
      arr_videos = await Promise.all(
        arr_playlistMemberData.map(async (data) => {
          const youtubeIds = data.map((data) => data.videoId);
          const memberIds = data.map((data) => data.memberId);
          const videos =
            await this._videoRepository.fetchVideoByYoutubeIdsAndCacheId(
              youtubeIds,
              cacheId
            );
          return memberIds.map((memberId, index) => {
            return {
              video: { ...videos[index], url: videos[index].url },
              videoMemberId: memberId,
            };
          });
        })
      );
    }

    const playlists: Playlist[] = await Promise.all(
      arr_videos.map(async (videos, index) => {
        return new Playlist(
          playlistIds[index],
          videos,
          arr_playlistData[index].title,
          arr_playlistData[index].createdAt,
          arr_playlistData[index].ownerId
        );
      })
    );

    return playlists;
  };
}
