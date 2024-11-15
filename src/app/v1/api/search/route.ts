import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError, UnAuthorizeError } from "@/src/app/error/errors";
import { SearchService } from "@/src/application/search/SearchService";
import { YoutubeDataSearchRepository } from "@/src/infrastructure/search/YoutubeDataSearchRepository";
import { NotFoundError } from "next/dist/client/components/not-found";
import { NextRequest, NextResponse } from "next/server";

const searchRepository = new YoutubeDataSearchRepository();
const searchService = new SearchService(searchRepository);

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
