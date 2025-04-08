import { auth } from "@/auth";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { DeletePlaylistMemberByMemberId } from "@/src/backend/application/playlist/DeletePlaylistMemberByMemberId";
import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const playlistRepository = new MySQLPlaylistRepository();
const deletePlaylistMemberByMemberId = new DeletePlaylistMemberByMemberId(
  playlistRepository
);

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string; playlistId: string; memberId: string }>;
  }
): Promise<NextResponse> => {
  try {
    const { userId, playlistId, memberId } = await params;

    if (!userId || !playlistId || !memberId) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session: Session | null = await auth();

    if (!(session?.user?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    await deletePlaylistMemberByMemberId.run(playlistId, userId, memberId);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return errorHandler(err);
  }
};
