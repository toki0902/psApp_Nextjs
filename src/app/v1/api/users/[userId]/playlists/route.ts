import { NextRequest, NextResponse } from "next/server";

import { FetchPlaylistsAndVideosByUserId } from "@/src/backend/application/playlist/FetchPlaylistsAndVideosByUserId";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { RegisterNewPlaylist } from "@/src/backend/application/playlist/RegisterNewPlaylist";
import { Session } from "next-auth";
import { auth } from "@/src/backend/interface/auth/auth";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();

const fetchPlaylistsAndVideos = new FetchPlaylistsAndVideosByUserId(
  playlistRepository,
  videoRepository,
);
const registerNewPlaylist = new RegisterNewPlaylist(playlistRepository);

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse> => {
  try {
    const { userId: userIdParam } = await params;

    if (!userIdParam) {
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

    const playlists = await fetchPlaylistsAndVideos.run(pool, userId);

    return new NextResponse(JSON.stringify({ playlists: playlists }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistTitle: string }> },
): Promise<NextResponse> => {
  try {
    const { playlistTitle } = await req.json();
    const { userId: userIdParam } = await params;

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

    await registerNewPlaylist.run(pool, playlistTitle, userId);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りを追加しました。" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
