import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";

export class FetchPlaylistsAndVideosByUserId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (pool: Pool, userId: string): Promise<Playlist[]> => {
    const conn = await pool.getConnection();
    const arr_playlistData =
      await this._playlistRepository.fetchPlaylistsByUserId(conn, userId);

    if (!arr_playlistData?.length) {
      return [];
    }

    const playlistIds = arr_playlistData.map((item) => item.playlistId);

    const arr_playlistMemberData =
      await this._playlistRepository.fetchPlaylistMembersByPlaylistIds(
        conn,
        playlistIds,
      );

    //fix :: N + 1問題発生
    const arr_videos = await Promise.all(
      arr_playlistMemberData.map(async (data) => {
        const youtubeIds = data.videos.map((data) => data.videoId);
        const memberIds = data.videos.map((data) => data.memberId);
        const videos = await this._videoRepository.fetchVideoByYoutubeIds(
          conn,
          youtubeIds,
        );
        return memberIds.map((memberId, index) => {
          return {
            video: { ...videos[index], url: videos[index].url },
            videoMemberId: memberId,
          };
        });
      }),
    );

    conn.release();

    const playlists: Playlist[] = await Promise.all(
      arr_videos.map(async (videos, index) => {
        return new Playlist(
          playlistIds[index],
          videos,
          arr_playlistData[index].title,
          arr_playlistData[index].createdAt,
          arr_playlistData[index].ownerId,
        );
      }),
    );

    return playlists;
  };
}
