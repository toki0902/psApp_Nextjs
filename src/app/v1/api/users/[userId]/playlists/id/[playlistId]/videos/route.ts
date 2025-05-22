import { NextRequest, NextResponse } from "next/server";

import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { Session } from "next-auth";
import { auth } from "@/src/backend/interface/auth/auth";
import { RegisterNewPlaylistMemberByPlaylistIds } from "@/src/backend/application/playlist/RegisterNewPlaylistMemberByPlaylistIds";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMemberByPlaylistIds(
  playlistRepository,
);

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistId: string }>;
  },
): Promise<NextResponse> => {
  try {
    const { videoId } = await req.json();
    const { userId, playlistId } = await params;

    if (!userId || !playlistId || !videoId) {
      throw new MissingParamsError(
        "パラメータが不足しています。",
        "Required parameter is missing or invalid",
      );
    }

    const session: Session | null = await auth();

    if (!(session?.userId === userId)) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    await registerNewPlaylistMember.run(pool, [playlistId], userId, videoId);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りに動画を追加しました。" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
