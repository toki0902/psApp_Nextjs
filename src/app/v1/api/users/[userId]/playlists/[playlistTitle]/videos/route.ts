import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/src/backend/infrastructure/auth/nextauthOption";
import { getServerSession } from "next-auth";

import { RegisterNewPlaylistMember } from "@/src/backend/application/playlist/RegisterNewPlaylistMember";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";

const playlistRepository = new MySQLPlaylistRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMember(
  playlistRepository
);

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistTitle: string }>;
  }
): Promise<NextResponse> => {
  try {
    const { videoId } = await req.json();
    const { userId, playlistTitle } = await params;

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

    await registerNewPlaylistMember.run(playlistTitle, userId, videoId);

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
