import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/infrastructure/auth/nextauthOption";

import { FetchPlaylistsAndVideosByUserId } from "@/src/application/playlist/FetchPlaylistsAndVideosByUserId";
import { MySQLPlaylistRepository } from "@/src/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";

const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();
const searchGateway = new YoutubeDataSearchGateway();

const fetchPlaylistAndVideos = new FetchPlaylistsAndVideosByUserId(
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

    if (!userId) {
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

    const playlists = await fetchPlaylistAndVideos.run(userId);

    return new NextResponse(JSON.stringify({ playlists: playlists }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
