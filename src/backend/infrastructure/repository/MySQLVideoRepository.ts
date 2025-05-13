import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { createConnectionPool } from "../db/MySQLConnection";
import { Video } from "@/src/backend/domain/entities/Video";
import mysql from "mysql2/promise";
import { MySQLError, NotFoundError } from "@/src/app/error/errors";
import { toMysqlDatetimeFromUtc } from "@/src/share/utils/format";

export class MySQLVideoRepository implements IVideoRepository {
  private pool = createConnectionPool();

  fetchVideosByCacheId = async (cacheId: number): Promise<Video[]> => {
    try {
      const videoResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>(
        "select * from videos where video_cache_id = ?",
        [cacheId],
      );

      const record = videoResult[0];
      if (record.length === 0) {
        throw new NotFoundError("キャッシュIDが無効です。", "invalid cacheId");
      }

      return record.map(
        (item) =>
          new Video(
            item.video_youtube_id,
            item.views,
            item.thumbnail,
            item.title,
            item.published_at,
          ),
      );
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch video by cacheId in process 'fetchVideosByCacheId': ${err}`,
      );
    }
  };

  fetchValidCacheId = async (): Promise<number | undefined> => {
    try {
      const videoCacheResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>(
        "select * from video_caches where expires > now()",
      );

      const record = videoCacheResult[0];
      if (record.length === 0) {
        return undefined;
      }

      return Number(record[0].video_cache_id);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch valid cacheId in process 'fetchValidCacheId': ${err}`,
      );
    }
  };

  insert = async (videos: Video[]): Promise<void> => {
    const connection = await (await this.pool).getConnection();
    try {
      // トランザクション開始
      await connection.beginTransaction();

      // `video_caches`テーブルへの挿入
      const videoCacheInsertResult =
        await connection.execute<mysql.ResultSetHeader>(
          `INSERT INTO video_caches (expires) VALUES (DATE_ADD(NOW(), INTERVAL 15 DAY))`,
        );

      const cacheRecord = videoCacheInsertResult[0];
      const cacheId = cacheRecord.insertId;

      const values = videos.flatMap((item) => [
        item.videoId || null,
        cacheId,
        item.views,
        item.thumbnail,
        item.title,
        toMysqlDatetimeFromUtc(item.publishedAt),
      ]);

      const videoQuery = `INSERT INTO videos (video_youtube_id, video_cache_id, views, thumbnail, title, published_at) VALUES ${videos
        .map(() => "(?,?,?,?,?,?)")
        .join(",")}`;

      const videosInsertResult = await connection.execute(videoQuery, values);

      await connection.commit();

      console.log("Transaction committed:", videosInsertResult);
    } catch (err) {
      await connection.rollback();
      console.error("Transaction rolled back due to error:", err);
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `An unexpected error occurred. Please try again later`,
      );
    } finally {
      // 接続を解放
      connection.release();
    }
  };

  fetchVideoByYoutubeIdsAndCacheId = async (
    ids: string[],
    cacheId: number,
  ): Promise<Video[]> => {
    try {
      if (ids.length === 0) {
        return [];
      }
      const query = `select * from videos where video_cache_id = ? and video_youtube_id in (${ids
        .map(() => {
          return "?";
        })
        .join(",")})`;

      const value = [cacheId, ...ids];

      const selectResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>(query, value);

      const record = selectResult[0];
      if (!record.length) {
        return [];
      }

      const videos = record.map((data) => {
        return new Video(
          data.video_youtube_id,
          data.views,
          data.thumbnail,
          data.title,
          data.published_at,
        );
      });

      return videos;
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch video from cache: ${err}`,
      );
    }
  };
}
