import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import { UnAuthorizeError } from "@/src/backend/interface/error/errors";
import { NextRequest, NextResponse } from "next/server";

import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";
import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";

import { SyncYoutubeVideos } from "@/src/backend/application/video/SyncYoutubeVideos";

const videoRepository = new MySQLVideoRepository();
const youtubeGateway = new YoutubeDataSearchGateway();

const syncYoutubeVideos = new SyncYoutubeVideos(
  videoRepository,
  youtubeGateway,
);

export const GET = async (req: NextRequest) => {
  try {
    const secret = req.nextUrl.searchParams.get("secret") || "";

    if (secret !== process.env.GOOGLE_SYNC_SECRET) {
      throw new UnAuthorizeError(
        "シークレットが無効です。",
        "secret is invalid",
      );
    }

    await syncYoutubeVideos.run();

    return new NextResponse(
      JSON.stringify({
        message: `complete syncing youtube-video: ${new Date().toDateString}`,
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    errorHandler(err);
  }
};
