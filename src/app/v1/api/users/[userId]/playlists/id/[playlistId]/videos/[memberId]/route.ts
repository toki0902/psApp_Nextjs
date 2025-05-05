import { auth } from "@/auth";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { DeletePlaylistMemberByMemberId } from "@/src/backend/application/playlist/DeletePlaylistMemberByMemberId";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
      userId,
      playlistId,
      memberId,
    }: { userId: string; playlistId: string; memberId: string } = await params;

    if (!userId || !playlistId || !memberId) {
      throw new MissingParamsError(
        "パラメータが不足しています。",
        "Required parameter is missing or invalid",
      );
    }

    const session: Session | null = await auth();

    if (!(session?.user?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    await deletePlaylistMemberByMemberId.run(playlistId, userId, memberId);

    return new NextResponse(
      JSON.stringify({ message: "お気に入りから動画を削除しました。" }),
      { status: 200 },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
