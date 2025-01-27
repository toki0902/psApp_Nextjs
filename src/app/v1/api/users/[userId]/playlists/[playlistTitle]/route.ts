import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/src/backend/infrastructure/auth/nextauthOption";

import { FetchPlaylistAndVideosByUserIdAndPlaylistTitle } from "@/src/backend/application/playlist/FetchPlaylistAndVideosByUserIdAndPlaylistTItle";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";
import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { Session } from "next-auth";

const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();
const searchGateway = new YoutubeDataSearchGateway();

const fetchPlaylistAndVideosByUserIdAndPlaylistTitle =
  new FetchPlaylistAndVideosByUserIdAndPlaylistTitle(
    playlistRepository,
    videoRepository,
    searchGateway
  );

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistTitle: string }> }
): Promise<NextResponse> => {
  try {
    const { userId, playlistTitle } = await params;

    if (!userId || !playlistTitle) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session: Session | null = await getServerSession(nextAuthOptions);

    if (!(session?.user?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    const playlist = await fetchPlaylistAndVideosByUserIdAndPlaylistTitle.run(
      userId,
      playlistTitle
    );

    return new NextResponse(JSON.stringify({ playlist: playlist }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
