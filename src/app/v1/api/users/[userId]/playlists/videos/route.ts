import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { RegisterNewPlaylistMemberByPlaylistIds } from "@/src/backend/application/playlist/RegisterNewPlaylistMemberByPlaylistIds";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { User } from "@/src/backend/domain/entities/User";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

const pool = await createConnectionPool();
const playlistRepository = new MySQLPlaylistRepository();
const videoRepository = new MySQLVideoRepository();

const registerNewPlaylistMember = new RegisterNewPlaylistMemberByPlaylistIds(
  playlistRepository,
  videoRepository,
);

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse> => {
  try {
    const { videoId, playlistIds } = await req.json();
    const { userId: userIdParam } = await params;

    if (!userIdParam || !playlistIds || !videoId) {
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

    await registerNewPlaylistMember.run(pool, playlistIds, user, videoId);

    return new NextResponse(
      JSON.stringify({
        videoId,
        playlistIds,
        message: "お気に入りに動画を追加しました。",
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
