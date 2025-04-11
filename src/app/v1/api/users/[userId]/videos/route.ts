import { auth } from "@/auth";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { RegisterNewPlaylistMemberByPlaylistIds } from "@/src/backend/application/playlist/RegisterNewPlaylistMemberByPlaylistIds";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const playlistRepository = new MySQLPlaylistRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMemberByPlaylistIds(
  playlistRepository,
);

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse> => {
  try {
    const { videoId, playlistIds } = await req.json();
    const { userId } = await params;

    if (!userId || !playlistIds) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session: Session | null = await auth();

    if (!(session?.user.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again",
      );
    }

    await registerNewPlaylistMember.run([playlistIds], userId, videoId);

    return new NextResponse(
      JSON.stringify({
        videoId,
        playlistIds,
        msg: "プレイリストに動画を追加しました。",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
