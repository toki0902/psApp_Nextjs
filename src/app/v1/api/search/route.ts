import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";
import { SearchService } from "@/src/application/search/SearchService";
import { YoutubeDataSearchRepository } from "@/src/infrastructure/search/YoutubeDataSearchRepository";
import { NextRequest, NextResponse } from "next/server";

const searchRepository = new YoutubeDataSearchRepository();
const searchService = new SearchService(searchRepository);

export const GET = async (req: NextRequest) => {
  const keyword = req.nextUrl.searchParams.get("q");
  if (keyword === null) {
    return errorHandler(
      new MissingParamsError(
        "This request does not contain the required parameters"
      )
    );
  }

  const videos = searchService.findVideosByKeyword(keyword);

  return new NextResponse(JSON.stringify({ msg: "response" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
