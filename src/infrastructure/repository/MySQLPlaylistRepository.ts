import { IPlaylistRepository } from "@/src/domain/dataAccess/repository/IPlaylistRepository";
import { createConnectionPool } from "../db/MySQLConnection";
import { MySQLError } from "@/src/app/error/errors";
import mysql from "mysql2/promise";

export class MySQLPlaylistRepository implements IPlaylistRepository {
  private pool = createConnectionPool();

  fetchPlaylistMemberIdsByPlaylistId = async (
    playlistId: string
  ): Promise<{ videoId: string; memberId: number }[]> => {
    const query = "select * from playlist_members where playlist_id = ?";

    const selectResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>(query, [playlistId]);

    const record = selectResult[0];
    if (!record.length) {
      return [];
    }

    const arr_videoInfo = record.map((item) => {
      return { videoId: item.video_id, memberId: item.member_id };
    });

    return arr_videoInfo;
  };

  fetchPlaylistByUserId = async (
    userId: string
  ): Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: number;
      }[]
  > => {
    try {
      const query = "select * from playlists where owner_id = ?";
      const selectResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>(query, [userId]);

      const record = selectResult[0];
      if (!record.length) {
        return [];
      }

      const playlistData = record.map((item) => {
        return {
          playlistId: item.playlist_id,
          createdAt: item.created_at,
          title: item.title,
          ownerId: item.owner_id,
        };
      });
      return playlistData;
    } catch (err) {
      throw new MySQLError(`failed to fetch playlistInfo ${err}`);
    }
  };
}
