import { errorHandler } from "@/src/app/error/errorHandler";
import { PlaylistService } from "@/src/application/playlist/PlaylistService";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLPlaylistRepository } from "@/src/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";
import { NextRequest, NextResponse } from "next/server";

const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();
const searchGateway = new YoutubeDataSearchGateway();

const playlistService = new PlaylistService(
  playlistRepository,
  videoRepository,
  searchGateway
);

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistTitle: string }> }
): Promise<NextResponse> => {
  try {
    //fix: 参照先！
    const { userId, playlistTitle } = await params;
    await playlistService.registerNewPlaylist(playlistTitle, userId);

    return new NextResponse(JSON.stringify({ msg: "create new playlist!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
