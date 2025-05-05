import { NextRequest, NextResponse } from "next/server";

import { RegisterNewPlaylistMemberByPlaylistTitle } from "@/src/backend/application/playlist/RegisterNewPlaylistMember";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { Session } from "next-auth";
import { auth } from "@/auth";

const playlistRepository = new MySQLPlaylistRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMemberByPlaylistTitle(
  playlistRepository,
);

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistTitle: string }>;
  },
): Promise<NextResponse> => {
  try {
    const { videoId } = await req.json();
    const { userId, playlistTitle } = await params;

    if (!userId || !playlistTitle || !videoId) {
      throw new MissingParamsError(
        "パラメータが不足しています。",
        "Required parameter is missing",
      );
    }

    const session: Session | null = await auth();

    if (!(session?.user?.userId === userId)) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    await registerNewPlaylistMember.run(playlistTitle, userId, videoId);

    return new NextResponse(
      JSON.stringify({ msg: "add new video to playlist!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
