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
import { User } from "@/src/backend/domain/entities/User";

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
    if (!session)
      throw new UnAuthorizeError(
        "認証されていません。ログインしてください",
        "You are not authenticated. Please log in and try again",
      );

    const user = new User(
      session.userId,
      session.name,
      session.image || "",
      session.graduationYear,
    );
    if (!user.isMe(userIdParam))
      throw new UnAuthorizeError(
        "認可が降りていません。自身のリソースを操作してください。",
        "You are not authorized. Please operate on your own resources",
      );

    const playlist = await fetchPlaylistAndVideosByUserIdAndPlaylistTitle.run(
      pool,
      user,
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
