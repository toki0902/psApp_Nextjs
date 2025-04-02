import { auth } from "@/auth";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { MySQLPlaylistRepository } from "@/src/backend/infrastructure/repository/MySQLPlaylistRepository";
import { DeletePlaylistByPlaylistId } from "@/src/backend/application/playlist/DeletePlaylistByPlaylistId";
import { ChangePlaylistTitleByPlaylistId } from "@/src/backend/application/playlist/ChangePlaylistTitleByPlaylistId";

const playlistRepository = new MySQLPlaylistRepository();
const deletePlaylistByPlaylistId = new DeletePlaylistByPlaylistId(
  playlistRepository
);
const changePlaylistTitleByPlaylistId = new ChangePlaylistTitleByPlaylistId(
  playlistRepository
);

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistId: string }> }
): Promise<NextResponse> => {
  try {
    const { userId, playlistId } = await params;

    if (!userId || !playlistId) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing");
    }

    const session: Session | null = await auth();

    if (session?.user?.userId !== userId) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    await deletePlaylistByPlaylistId.run(playlistId);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return errorHandler(err);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; playlistId: string }> }
): Promise<NextResponse> => {
  try {
    const { userId, playlistId } = await params;
    const { newTitle } = await req.json();

    if (
      !userId ||
      !playlistId ||
      typeof newTitle !== "string" ||
      newTitle.trim() === ""
    ) {
      console.log("Required parameter is missing");
      throw new MissingParamsError("Required parameter is missing or invalid");
    }

    const session: Session | null = await auth();

    if (session?.user?.userId !== userId) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "You are not authenticated. Please log in and try again"
      );
    }

    await changePlaylistTitleByPlaylistId.run(playlistId, newTitle);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return errorHandler(err);
  }
};
