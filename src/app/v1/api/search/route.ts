import { NextRequest, NextResponse } from "next/server";

import { FindVideosByKeyword } from "@/src/backend/application/search/FindVideosByKeyword";

import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";

const searchGateway = new YoutubeDataSearchGateway();
const videoRepository = new MySQLVideoRepository();
const findVideosByKeyword = new FindVideosByKeyword(
  searchGateway,
  videoRepository
);

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const keyword = req.nextUrl.searchParams.get("q");
    if (keyword === null) {
      throw new MissingParamsError(
        "This request does not contain the required parameters"
      );
    }

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
