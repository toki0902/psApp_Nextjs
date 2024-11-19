import { errorHandler } from "@/src/app/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";

import { PlaylistService } from "@/src/application/playlist/PlaylistService";
import { MySQLPlaylistRepository } from "@/src/infrastructure/repository/MySQLPlaylistRepository";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";

const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();
const searchGateway = new YoutubeDataSearchGateway();

const playlistService = new PlaylistService(
  playlistRepository,
  videoRepository,
  searchGateway
);

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse> => {
  try {
    const { userId } = await params;
    const playlists = await playlistService.fetchPlaylistAndVideos(userId);

    //getterからURLを追加
    const responseData = playlists.map((playlist) => {
      return {
        ...playlist,
        videos: playlist.videos.map((videoObj) => {
          return {
            video: { ...videoObj.video, url: videoObj.video.url },
            videoMemberId: videoObj.videoMemberId,
          };
        }),
      };
    });

    return new NextResponse(JSON.stringify({ playlists: responseData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};

export const POST = async (req: NextRequest) => {
  try {
  } catch (err) {
    return errorHandler(err);
  }
};
