import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { DeletePlaylistMemberByMemberId } from "@/src/backend/application/playlist/DeletePlaylistMemberByMemberId";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();
const deletePlaylistMemberByMemberId = new DeletePlaylistMemberByMemberId(
  playlistRepository,
);

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistId: string; memberId: string }>;
  },
): Promise<NextResponse> => {
  try {
    const {
      userId: userIdParam,
      playlistId,
      memberId,
    }: { userId: string; playlistId: string; memberId: string } = await params;

    if (!userIdParam || !playlistId || !memberId) {
      throw new MissingParamsError(
        "パラメータが不足しています。",
        "Required parameter is missing or invalid",
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

    await deletePlaylistMemberByMemberId.run(
      pool,
      playlistId,
      userId,
      memberId,
    );

    return new NextResponse(
      JSON.stringify({ message: "お気に入りから動画を削除しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
