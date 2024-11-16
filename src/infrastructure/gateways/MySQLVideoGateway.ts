import { IVideoGateway } from "@/src/domain/dataAccess/IVideoGateway";
import { createConnectionPool } from "../db/MySQLConnection";
import { Video } from "@/src/domain/entities/Video";
import mysql from "mysql2/promise";
import { MySQLError, NotFoundError } from "@/src/app/error/errors";

export class MySQLVideoGateway implements IVideoGateway {
  private pool = createConnectionPool();

  fetchVideosByCacheId = async (cacheId: number): Promise<Video[]> => {
    const videoResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>(
      "select * from videos where video_cache_id = ?",
      [cacheId]
    );

    const record = videoResult[0];
    if (record.length === 0) {
      throw new NotFoundError("invalid cacheId");
    }

    return record.map(
      (item) => new Video(item.url, item.views, item.thumbnail, item.title)
    );
  };

  fetchValidCacheId = async (): Promise<number | undefined> => {
    const videoCacheResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>(
      "select * from video_caches where expires > now()"
    );

    const record = videoCacheResult[0];
    if (record.length === 0) {
      return undefined;
    }

    return Number(record[0].video_cache_id);
  };

  insert = async (videos: Video[]): Promise<void> => {
    const connection = await (await this.pool).getConnection();
    try {
      // トランザクション開始
      await connection.beginTransaction();

      // `video_caches`テーブルへの挿入
      const videoCacheInsertResult =
        await connection.execute<mysql.ResultSetHeader>(
          `INSERT INTO video_caches (expires) VALUES (DATE_ADD(NOW(), INTERVAL 15 DAY))`
        );

      const cacheRecord = videoCacheInsertResult[0];
      const cacheId = cacheRecord.insertId;

      const values = videos.flatMap((item) => [
        item.url || null,
        cacheId,
        item.views || 0,
        item.thumbnail || "none",
        item.title || "Untitled",
      ]);

      const videoQuery = `INSERT INTO videos (url, video_cache_id, views, thumbnail, title) VALUES ${videos
        .map(() => "(?,?,?,?,?)")
        .join(",")}`;

      console.log(values);

      const videosInsertResult = await connection.execute(videoQuery, values);

      await connection.commit();

      console.log("Transaction committed:", videosInsertResult);
    } catch (err) {
      await connection.rollback();
      console.error("Transaction rolled back due to error:", err);
      throw new MySQLError(
        `An unexpected error occurred. Please try again later`
      );
    } finally {
      // 接続を解放
      connection.release();
    }
  };
}
