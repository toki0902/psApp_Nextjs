import { ChangePlaylistTitleByPlaylistId } from "@/src/backend/application/playlist/ChangePlaylistTitleByPlaylistId";
import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { User } from "@/src/backend/domain/entities/User";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();

const changePlaylistTitleByPlaylistId = new ChangePlaylistTitleByPlaylistId(
  playlistRepository,
);

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

    await changePlaylistTitleByPlaylistId.run(pool, playlistId, user, newTitle);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りのタイトルを変更しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
