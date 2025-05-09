console.log("⏱️ NEXT_RUNTIME:", process.env.NEXT_RUNTIME);
import { NextRequest, NextResponse } from "next/server";

import { FindVideosByKeyword } from "@/src/backend/application/search/FindVideosByKeyword";

import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

import { errorHandler } from "@/src/app/error/errorHandler";

const searchGateway = new YoutubeDataSearchGateway();
const videoRepository = new MySQLVideoRepository();
const findVideosByKeyword = new FindVideosByKeyword(
  searchGateway,
  videoRepository,
);

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const keyword = req.nextUrl.searchParams.get("q") || "";

    const videos = await findVideosByKeyword.run(keyword);

    const resObj = videos.map((videoObj) => {
      return { ...videoObj, url: videoObj.url };
    });

    return new NextResponse(JSON.stringify({ videos: resObj }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
