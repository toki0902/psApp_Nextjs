import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/src/infrastructure/auth/nextauthOption";

import { FetchPlaylistAndVideosByUserIdAndPlaylistTitle } from "@/src/application/playlist/FetchPlaylistAndVideosByUserIdAndPlaylistTItle";
import { RegisterNewPlaylist } from "@/src/application/playlist/RegisterNewPlaylist";
import { MySQLPlaylistRepository } from "@/src/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";

const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();
const searchGateway = new YoutubeDataSearchGateway();

const fetchPlaylistAndVideosByUserIdAndPlaylistTitle =
  new FetchPlaylistAndVideosByUserIdAndPlaylistTitle(
    playlistRepository,
    videoRepository,
    searchGateway
  );
const registerNewPlaylist = new RegisterNewPlaylist(playlistRepository);

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistTitle: string }> }
): Promise<NextResponse> => {
  try {
    const { userId, playlistTitle } = await params;

    if (!userId || !playlistTitle) {
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

    await registerNewPlaylist.run(playlistTitle, userId);

    return new NextResponse(JSON.stringify({ msg: "create new playlist!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};

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

    const session = await getServerSession(nextAuthOptions);

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
