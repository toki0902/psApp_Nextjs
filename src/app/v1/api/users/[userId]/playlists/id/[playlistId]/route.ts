import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { DeletePlaylistByPlaylistId } from "@/src/backend/application/playlist/DeletePlaylistByPlaylistId";
import { ChangePlaylistTitleByPlaylistId } from "@/src/backend/application/playlist/ChangePlaylistTitleByPlaylistId";

import { FetchPlaylistAndVideosByUserIdAndPlaylistId } from "@/src/backend/application/playlist/FetchPlaylistAndVideosByUserIdAndPlaylistId";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { User } from "@/src/backend/domain/entities/User";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();

const FetchPlaylistsAndVideosByPlaylistId =
  new FetchPlaylistAndVideosByUserIdAndPlaylistId(
    playlistRepository,
    videoRepository,
  );
const deletePlaylistByPlaylistId = new DeletePlaylistByPlaylistId(
  playlistRepository,
);

const changePlaylistTitleByPlaylistId = new ChangePlaylistTitleByPlaylistId(
  playlistRepository,
);

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistId: string }> },
): Promise<NextResponse> => {
  try {
    const { userId: userIdParam, playlistId } = await params;

    if (!userIdParam || !playlistId) {
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

    const playlist = await FetchPlaylistsAndVideosByPlaylistId.run(
      pool,
      user,
      playlistId,
    );

    return new NextResponse(JSON.stringify({ playlist: playlist }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistId: string }> },
): Promise<NextResponse> => {
  try {
    const { userId: userIdParam, playlistId } = await params;

    if (!userIdParam || !playlistId) {
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

    await deletePlaylistByPlaylistId.run(pool, playlistId, user);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りを削除しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
