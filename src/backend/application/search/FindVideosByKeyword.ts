import { Video } from "@/src/backend/domain/entities/Video";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import Fuse from "fuse.js";
import { auth } from "../../interface/auth/auth";
import { endOfMonth, startOfMonth } from "date-fns";
import { Pool } from "mysql2/promise";

export class FindVideosByKeyword {
  constructor(private _videoRepository: IVideoRepository) {}

  run = async (
    pool: Pool,
    keyword: string,
    isAllVideo: boolean,
  ): Promise<Video[]> => {
    const conn = await pool.getConnection();
    const allUploadedVideos = await this._videoRepository.fetchAllVideos(conn);
    conn.release();

    let targetVideos = [...allUploadedVideos];

    const session = await auth();

    const graduationYear =
      session?.graduationYear ||
      (new Date().getMonth() > 3
        ? new Date().getFullYear() + 1
        : new Date().getFullYear());

    const startDate = startOfMonth(new Date(graduationYear - 4, 3));
    const endDate = endOfMonth(new Date(graduationYear, 3));

    if (!isAllVideo) {
      targetVideos = targetVideos.filter(
        (video) => video.publishedAt > startDate && video.publishedAt < endDate,
      );
    }

    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.4,
      distance: 100,
    };

    const fuse = new Fuse(targetVideos, fuseOptions);

    const results = fuse.search(keyword);

    const searchedVideos = results
      .map((result) => result.item)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    console.log(`hit ${searchedVideos.length} videos`);

    return searchedVideos;
  };
}
