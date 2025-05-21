import { NotFoundError } from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";

export class FetchPlaylistAndVideosByUserIdAndPlaylistTitle {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (
    pool: Pool,
    userId: string,
    playlistTitle: string,
  ): Promise<Playlist> => {
    const conn = await pool.getConnection();
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
        conn,
        playlistTitle,
        userId,
      );

    if (!playlistData) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    const playlistMemberObj = (
      await this._playlistRepository.fetchPlaylistMembersByPlaylistIds(conn, [
        playlistData.playlistId,
      ])
    )[0];

    if (!playlistMemberObj.videos.length) {
      return new Playlist(
        playlistData.playlistId,
        [],
        playlistData.title,
        playlistData.createdAt,
        playlistData.ownerId,
      );
    }

    const arr_videoInfo = (
      await this._videoRepository.fetchVideoByYoutubeIds(
        conn,
        playlistMemberObj.videos.map((i) => i.videoId),
      )
    ).map((video, index) => {
      return {
        videoMemberId: playlistMemberObj.videos[index].memberId,
        video: { ...video, url: video.url },
      };
    });

    return new Playlist(
      playlistData.playlistId,
      arr_videoInfo,
      playlistData.title,
      playlistData.createdAt,
      playlistData.ownerId,
    );
  };
}
