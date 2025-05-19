import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { createConnectionPool } from "../db/MySQLConnection";
import { Video } from "@/src/backend/domain/entities/Video";
import mysql from "mysql2/promise";
import {
  MySQLError,
  NotFoundError,
} from "@/src/backend/interface/error/errors";
import { toMysqlDatetimeFromUtc } from "@/src/share/utils/format";

export class MySQLVideoRepository implements IVideoRepository {
  private pool = createConnectionPool();

  fetchVideos = async (): Promise<Video[]> => {
    try {
      const videoResult = await (
        await this.pool
      ).execute<mysql.RowDataPacket[]>("select * from videos;");

      const record = videoResult[0];
      if (record.length === 0) {
        throw new NotFoundError(
          "キャッシュが見つかりませんでした。",
          "notFound video cache",
        );
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

  insert = async (videos: Video[]): Promise<void> => {
    const connection = await (await this.pool).getConnection();
    try {
      // トランザクション開始
      await connection.beginTransaction();

      const values = videos.flatMap((item) => [
        item.videoId || null,
        item.views,
        item.thumbnail,
        item.title,
        toMysqlDatetimeFromUtc(item.publishedAt),
      ]);

      const videoQuery = `INSERT INTO videos (video_youtube_id, views, thumbnail, title, published_at) VALUES ${videos
        .map(() => "(?,?,?,?,?)")
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

  syncVideos = async (videos: Video[]) => {
    const connection = await (await this.pool).getConnection();
    try {
      // トランザクション開始
      await connection.beginTransaction();

      await connection.execute("DELETE FROM videos");

      const values = videos.flatMap((item) => [
        item.videoId || null,
        item.views,
        item.thumbnail,
        item.title,
        toMysqlDatetimeFromUtc(item.publishedAt),
      ]);

      const videoQuery = `INSERT INTO videos (video_youtube_id, views, thumbnail, title, published_at) VALUES ${videos
        .map(() => "(?,?,?,?,?)")
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

  fetchVideoByYoutubeIds = async (ids: string[]): Promise<Video[]> => {
    try {
      if (ids.length === 0) {
        return [];
      }
      const query = `select * from videos where video_youtube_id in (${ids
        .map(() => {
          return "?";
        })
        .join(",")})`;

      const value = [...ids];

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
