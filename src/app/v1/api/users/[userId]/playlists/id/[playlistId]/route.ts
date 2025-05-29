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

    if ((session?.userId !== userIdParam && userIdParam !== "me") || !session) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    const userId = userIdParam === "me" ? session.userId : userIdParam;

    const playlist = await FetchPlaylistsAndVideosByPlaylistId.run(
      pool,
      userId,
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

    if ((session?.userId !== userIdParam && userIdParam !== "me") || !session) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    const userId = userIdParam === "me" ? session.userId : userIdParam;

    await deletePlaylistByPlaylistId.run(pool, playlistId, userId);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りを削除しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistId: string }> },
): Promise<NextResponse> => {
  try {
    const { userId: userIdParam, playlistId } = await params;
    const { newTitle } = await req.json();

    if (
      !userIdParam ||
      !playlistId ||
      typeof newTitle !== "string" ||
      newTitle.trim() === ""
    ) {
      throw new MissingParamsError(
        "パラメータが不足または無効です。",
        "Required parameter is missing or invalid",
      );
    }

    const session: Session | null = await auth();

    if ((session?.userId !== userIdParam && userIdParam !== "me") || !session) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    const userId = userIdParam === "me" ? session.userId : userIdParam;

    await changePlaylistTitleByPlaylistId.run(
      pool,
      playlistId,
      userId,
      newTitle,
    );

    return new NextResponse(
      JSON.stringify({ message: "お気に入りのタイトルを変更しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
