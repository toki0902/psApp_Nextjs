import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { PlaylistService } from "@/src/application/playlist/PlaylistService";
import { nextAuthOptions } from "@/src/infrastructure/auth/nextauthOption";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLPlaylistRepository } from "@/src/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";
import { getServerSession } from "next-auth";
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
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistTitle: string; videoId: string }>;
  }
): Promise<NextResponse> => {
  try {
    const { userId, playlistTitle, videoId } = await params;

    if (!userId || !playlistTitle || !videoId) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session = await getServerSession(nextAuthOptions);

    if (!(session?.user?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    await playlistService.registerNewPlaylistMember(
      playlistTitle,
      userId,
      videoId
    );

    return new NextResponse(
      JSON.stringify({ msg: "add new video to playlist!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
};
