import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";

import { MySQLError } from "@/src/backend/interface/error/errors";
import mysql, { Connection } from "mysql2/promise";
import { nanoid } from "nanoid";

export class MySQLPlaylistRepository implements IPlaylistRepository {
  fetchPlaylistsByPlaylistIds = async (
    conn: Connection,
    playlistIds: string[],
  ): Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
    | undefined
  > => {
    try {
      const query = `select * from playlists where playlist_id in (${playlistIds.map(() => "?").join(", ")})`;

      const selectResult = await conn.execute<mysql.RowDataPacket[]>(
        query,
        playlistIds,
      );

      if (selectResult[0].length !== playlistIds.length) {
        return undefined;
      }

      const returnObj = selectResult[0].map((item) => {
        return {
          playlistId: item.playlist_id,
          createdAt: item.created_at,
          title: item.title,
          ownerId: item.owner_id,
        };
      });

      return returnObj;
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch playlistsInfo in process 'fetchPlaylistsByPlaylistIds' due to: ${JSON.stringify(err)}`,
      );
    }
  };

  fetchPlaylistMembersByPlaylistIds = async (
    conn: Connection,
    playlistIds: string[],
  ): Promise<
    { playlistId: string; videos: { videoId: string; memberId: string }[] }[]
  > => {
    try {
      const [rows] = await conn.execute<mysql.RowDataPacket[]>(
        `SELECT * FROM playlist_members WHERE playlist_id IN (${playlistIds.map(() => "?").join(", ")})`,
        playlistIds,
      );

      const grouped = new Map<
        string,
        { videoId: string; memberId: string }[]
      >();
      for (const row of rows) {
        const playlistId = row.playlist_id;
        const videoId = row.video_id;
        const memberId = row.member_id;
        if (!grouped.has(playlistId)) grouped.set(playlistId, []);
        grouped.get(playlistId)!.push({ videoId, memberId });
      }

      return playlistIds.map((id) => ({
        playlistId: id,
        videos: grouped.get(id) ?? [],
      }));
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch playlistInfo in process 'fetchPlaylistMembersIdsByPlaylistIds' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  fetchPlaylistsByUserId = async (
    conn: Connection,
    userId: string,
  ): Promise<
    {
      playlistId: string;
      createdAt: string;
      title: string;
      ownerId: string;
    }[]
  > => {
    try {
      const query = "select * from playlists where owner_id = ?";
      const selectResult = await conn.execute<mysql.RowDataPacket[]>(query, [
        userId,
      ]);

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
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch playlistInfo in process 'fetchPlaylistByUserId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  fetchPlaylistByPlaylistTitleAndUserId = async (
    conn: Connection,
    playlistTitle: string,
    userId: string,
  ): Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }
    | undefined
  > => {
    try {
      const query = "select * from playlists where title = ? and owner_id = ?";
      const value = [playlistTitle, userId];
      const selectResult = await conn.execute<mysql.RowDataPacket[]>(
        query,
        value,
      );

      const record = selectResult[0][0];
      if (!record) {
        return undefined;
      }

      return {
        playlistId: record.playlist_id,
        createdAt: record.created_at,
        title: record.title,
        ownerId: record.owner_id,
      };
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch playlistInfo in process 'fetchPlaylistByPlaylistTitleAndUserId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  insertPlaylist = async (
    conn: Connection,
    title: string,
    ownerId: string,
  ): Promise<void> => {
    try {
      const query = `INSERT INTO playlists (playlist_id, title, owner_id) VALUES (?, ?, ?)`;
      const playlist_id = nanoid(15);
      const value = [playlist_id, title, ownerId];
      await conn.execute<mysql.ResultSetHeader>(query, value);

      console.log(`create new playlist with userId:${ownerId}`);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to create new playlist in process 'insertPlaylist' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  insertPlaylistMemberByPlaylistIdsAndVideoId = async (
    conn: Connection,
    videoId: string,
    playlistIds: string[],
  ): Promise<void> => {
    if (!playlistIds.length) {
      console.warn("playlistIds is empty. Skipping insert.");
      return;
    }

    try {
      const value = playlistIds.flatMap((playlistId) => {
        const memberId = nanoid(15);
        return [memberId, playlistId, videoId];
      });

      const query = `insert into playlist_members (member_id, playlist_id, video_id) values ${playlistIds
        .map(() => "(?, ?, ?)")
        .join(",")}`;

      await conn.execute<mysql.ResultSetHeader>(query, value);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to insert playlist member in process 'insertPlaylistMemberByPlaylistIdsAndVideoId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  deletePlaylistByPlaylistId = async (
    conn: Connection,
    playlistId: string,
  ): Promise<void> => {
    try {
      const query = `DELETE FROM playlists WHERE playlist_id = ?`;
      await conn.execute<mysql.ResultSetHeader>(query, [playlistId]);
      console.log(`delete playlist playlistId: ${playlistId}`);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to delete playlist in process 'deletePlaylistByPlaylistId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  deletePlaylistMemberByMemberId = async (
    conn: Connection,
    memberId: string,
  ): Promise<void> => {
    try {
      const query = `DELETE FROM playlist_members WHERE member_id = ?`;
      await conn.execute<mysql.ResultSetHeader>(query, [memberId]);
      console.log(`delete playlist member memberId: ${memberId}}`);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to delete playlist member in process 'deletePlaylistMemberByMemberId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };

  changePlaylistTitleByPlaylistId = async (
    conn: Connection,
    playlistId: string,
    newTitle: string,
  ): Promise<void> => {
    try {
      const query = `UPDATE playlists SET title = ? WHERE playlist_id = ?`;
      const updateResult = await conn.execute<mysql.ResultSetHeader>(query, [
        newTitle,
        playlistId,
      ]);
      console.log(
        `change the playlist title to ${newTitle} playlistId: ${playlistId}`,
      );

      console.log(JSON.stringify(updateResult));
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to change playlist title in process 'changePlaylistTitleByPlaylistId' due to: ${JSON.stringify(
          err,
        )}`,
      );
    }
  };
}
