import { IPlaylistRepository } from "@/src/domain/dataAccess/repository/IPlaylistRepository";
import { createConnectionPool } from "../db/MySQLConnection";
import { MySQLError } from "@/src/app/error/errors";
import mysql from "mysql2/promise";
import { nanoid } from "nanoid";

export class MySQLPlaylistRepository implements IPlaylistRepository {
  private pool = createConnectionPool();

  fetchPlaylistMemberIdsByPlaylistId = async (
    playlistId: string
  ): Promise<{ videoId: string; memberId: number }[]> => {
    try {
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
    } catch (err) {
      throw new MySQLError(
        `failed to fetch playlistInfo in process 'fetchPlaylistMemberIdsByPlaylistId' due to: ${JSON.stringify(
          err
        )}`
      );
    }
  };

  fetchPlaylistByUserId = async (
    userId: string
  ): Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
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
      throw new MySQLError(
        `failed create new playlistInfo in process 'fetchPlaylistByUserId' due to: ${JSON.stringify(
          err
        )}`
      );
    }
  };

  fetchPlaylistIdByPlaylistTitleAndUserId = async (
    playlistTitle: string,
    userId: string
  ): Promise<string> => {
    try {
      const query = "select * from playlists where title = ? and owner_id = ?";
      const value = [playlistTitle, userId];
      const selectResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>(query, value);

      const record = selectResult[0][0];
      if (!record) {
        return "";
      }

      return record.playlist_id;
    } catch (err) {
      throw new MySQLError(
        `failed create new playlistInfo in process 'fetchPlaylistIdByPlaylistTitleAndUserId' due to: ${JSON.stringify(
          err
        )}`
      );
    }
  };

  insertPlaylist = async (title: string, ownerId: string): Promise<void> => {
    try {
      const query = `INSERT INTO playlists (playlist_id, title, owner_id) VALUES (?, ?, ?)`;
      const playlist_id = nanoid(15);
      const value = [playlist_id, title, ownerId];
      const insertResult = await (
        await this.pool
      ).execute<mysql.ResultSetHeader>(query, value);

      console.log(`create new playlist with userId:${ownerId}`);
    } catch (err) {
      throw new MySQLError(
        `failed create new playlist in process 'insertPlaylist' due to: ${JSON.stringify(
          err
        )}`
      );
    }
  };

  insertPlaylistMember = async (
    videoId: string,
    playlistId: string
  ): Promise<void> => {
    try {
      const query = `INSERT INTO playlist_members (playlist_id, video_id) VALUES (?, ?)`;
      const value = [playlistId, videoId];
      const insertResult = await (
        await this.pool
      ).execute<mysql.ResultSetHeader>(query, value);

      console.log(`add video to playlist videoId:${videoId}`);
    } catch (err) {
      throw new MySQLError(
        `failed create new playlist in process 'insertPlaylistMember' due to: ${JSON.stringify(
          err
        )}`
      );
    }
  };
}
