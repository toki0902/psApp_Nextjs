import { NextRequest, NextResponse } from "next/server";

import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { RegisterNewPlaylistMemberByPlaylistId } from "@/src/backend/application/playlist/RegisterNewPlaylistMemberByPlaylistId";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { Session } from "next-auth";
import { auth } from "@/auth";

const playlistRepository = new MySQLPlaylistRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMemberByPlaylistId(
  playlistRepository
);

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistId: string }>;
  }
): Promise<NextResponse> => {
  try {
    const { videoId } = await req.json();
    const { userId, playlistId } = await params;

    if (!userId || !playlistId || !videoId) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session: Session | null = await auth();

    if (!(session?.user?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    await registerNewPlaylistMember.run(playlistId, userId, videoId);

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
