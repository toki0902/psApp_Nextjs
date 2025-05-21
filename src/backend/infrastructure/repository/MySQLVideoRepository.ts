import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";

import { Video } from "@/src/backend/domain/entities/Video";
import mysql, { Connection } from "mysql2/promise";
import {
  MySQLError,
  NotFoundError,
} from "@/src/backend/interface/error/errors";
import { toMysqlDatetimeFromUtc } from "@/src/share/utils/format";

export class MySQLVideoRepository implements IVideoRepository {
  fetchAllVideos = async (conn: Connection): Promise<Video[]> => {
    try {
      const videoResult = await conn.execute<mysql.RowDataPacket[]>(
        "select * from videos;",
      );

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
      if (err instanceof NotFoundError) {
        throw err;
      }

      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to fetch video by cacheId in process 'fetchVideosByCacheId': ${err}`,
      );
    }
  };

  insert = async (conn: Connection, videos: Video[]): Promise<void> => {
    try {
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

      await conn.execute(videoQuery, values);
      return;
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to insert video cache in process 'insert': ${err}`,
      );
    }
  };

  deleteVideoCache = async (conn: Connection) => {
    try {
      const query = `DELETE FROM videos`;
      await conn.execute(query);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to delete video cache in process 'deleteVideoCache': ${err}`,
      );
    }
  };

  syncVideos = async (conn: Connection, videos: Video[]) => {
    try {
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

      await conn.execute(videoQuery, values);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to sync video cache in process 'syncVideos': ${err}`,
      );
    }
  };

  fetchVideoByYoutubeIds = async (
    conn: Connection,
    ids: string[],
  ): Promise<Video[]> => {
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

      const selectResult = await conn.execute<mysql.RowDataPacket[]>(
        query,
        value,
      );

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
