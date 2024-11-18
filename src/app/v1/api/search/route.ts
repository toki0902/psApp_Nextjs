import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";
import { SearchService } from "@/src/application/search/SearchService";
import { YoutubeDataSearchGateway } from "@/src/infrastructure/gateways/YoutubeDataSearchGateway";
import { MySQLVideoRepository } from "@/src/infrastructure/repository/MySQLVideoRepository";
import { NextRequest, NextResponse } from "next/server";

const searchGateway = new YoutubeDataSearchGateway();
const videoRepository = new MySQLVideoRepository();
const searchService = new SearchService(searchGateway, videoRepository);

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const keyword = req.nextUrl.searchParams.get("q");
    if (keyword === null) {
      throw new MissingParamsError(
        "This request does not contain the required parameters"
      );
    }

    const videos = await searchService.findVideosByKeyword(keyword);

    return new NextResponse(JSON.stringify({ videos: videos }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
