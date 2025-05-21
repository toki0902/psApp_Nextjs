import { Connection } from "mysql2/promise";
import { Video } from "../../entities/Video";

export interface IVideoRepository {
  fetchAllVideos: (conn: Connection) => Promise<Video[]>;
  insert: (conn: Connection, videos: Video[]) => Promise<void>;
  syncVideos: (conn: Connection, videos: Video[]) => Promise<void>;
  deleteVideoCache: (conn: Connection) => Promise<void>;
  fetchVideoByYoutubeIds: (conn: Connection, ids: string[]) => Promise<Video[]>;
}
