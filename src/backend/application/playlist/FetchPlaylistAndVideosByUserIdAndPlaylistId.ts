import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";

export class FetchPlaylistAndVideosByUserIdAndPlaylistId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (
    pool: Pool,
    userId: string,
    playlistId: string,
  ): Promise<Playlist | undefined> => {
    const conn = await pool.getConnection();
    const playlistData =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds(conn, [
        playlistId,
      ]);

    if (!playlistData?.length) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    if (playlistData[0].ownerId !== userId) {
      throw new UnAuthorizeError(
        "このお気に入りを所持していません。",
        "you don't own this playlist",
      );
    }

    const playlistMemberObj = (
      await this._playlistRepository.fetchPlaylistMembersByPlaylistIds(conn, [
        playlistId,
      ])
    )[0];
    conn.release();

    if (!playlistMemberObj.videos.length) {
      return new Playlist(
        playlistData[0].playlistId,
        [],
        playlistData[0].title,
        playlistData[0].createdAt,
        playlistData[0].ownerId,
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
      playlistData[0].playlistId,
      arr_videoInfo,
      playlistData[0].title,
      playlistData[0].createdAt,
      playlistData[0].ownerId,
    );
  };
}
