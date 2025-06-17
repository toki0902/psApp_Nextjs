import {
  Playlist,
  PlaylistSummery,
} from "@/src/backend/domain/entities/Playlist";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Connection } from "mysql2/promise";
import { Video } from "@/src/backend/domain/entities/Video";

export class PlaylistFactory {
  constructor(private _videoRepository: IVideoRepository) {}

  async createMultipleFromSummeryAndMembers(
    conn: Connection,
    playlistSummery: PlaylistSummery[],
    playlistMembers: {
      playlistId: string;
      videos: { videoId: string; memberId: string }[];
    }[],
  ): Promise<Playlist[]> {
    if (!playlistSummery.length) {
      return [];
    }

    const allVideoIds = playlistMembers.flatMap((memberData) =>
      memberData.videos.map((data) => data.videoId),
    );

    const allVideos = await this._videoRepository.fetchVideoByYoutubeIds(
      conn,
      allVideoIds,
    );

    const videoMap = new Map<string, Video>(
      allVideos.map((video) => [video.videoId, video]),
    );

    return playlistSummery.map((item) => {
      const memberData = playlistMembers.find(
        (i) => i.playlistId === item.playlistId,
      );

      const videos =
        memberData?.videos.flatMap((i) => {
          const video = videoMap.get(i.videoId);
          if (!video) return [];
          return {
            videoMemberId: i.memberId,
            video: video,
          };
        }) || [];

      return new Playlist(
        item.playlistId,
        videos,
        item.title,
        item.createdAt,
        item.ownerId,
      );
    });
  }
}
