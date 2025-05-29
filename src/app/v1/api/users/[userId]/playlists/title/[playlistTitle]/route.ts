import { NextRequest, NextResponse } from "next/server";

import { FetchPlaylistAndVideosByUserIdAndPlaylistTitle } from "@/src/backend/application/playlist/FetchPlaylistAndVideosByUserIdAndPlaylistTItle";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { Session } from "next-auth";
import { auth } from "@/src/backend/interface/auth/auth";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();

const fetchPlaylistAndVideosByUserIdAndPlaylistTitle =
  new FetchPlaylistAndVideosByUserIdAndPlaylistTitle(
    playlistRepository,
    videoRepository,
  );

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistTitle: string }> },
): Promise<NextResponse> => {
  try {
    const { userId: userIdParam, playlistTitle } = await params;

    if (!userIdParam || !playlistTitle) {
      throw new MissingParamsError(
        "パラメータが不足しています。",
        "Required parameter is missing",
      );
    }

    const session: Session | null = await auth();

    if ((session?.userId !== userIdParam && userIdParam !== "me") || !session) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    const userId = userIdParam === "me" ? session.userId : userIdParam;

    const playlist = await fetchPlaylistAndVideosByUserIdAndPlaylistTitle.run(
      pool,
      userId,
      playlistTitle,
    );

    return new NextResponse(JSON.stringify({ playlist: playlist }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
