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

JSON.stringify({
  kind: "youtube#playlistItem",
  etag: "g3esILIfRD_NA0-wZjAGBPIbMRQ",
  id: "VVU5cU5HcHBEaWp5Tzh5ZEp5N1VEOUpnLjlkcm9aQmN5b2dz",
  snippet: {
    publishedAt: "2024-04-02T06:28:56Z",
    channelId: "UC9qNGppDijyO8ydJy7UD9Jg",
    title: "同志社アコーステック音楽サークル P.S. 2024 紹介動画",
    description:
      "同志社アコースティック音楽サークルP.S.です！\n2024年の新歓用紹介動画です。\n\nより詳しい新歓情報は、他SNSサイトからご確認ください♪\n＊Instagram\np.s._acoustic\n＊X(Twitter)\n@ps_music_2010",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/9droZBcyogs/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/9droZBcyogs/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/9droZBcyogs/hqdefault.jpg",
        width: 480,
        height: 360,
      },
      standard: {
        url: "https://i.ytimg.com/vi/9droZBcyogs/sddefault.jpg",
        width: 640,
        height: 480,
      },
      maxres: {
        url: "https://i.ytimg.com/vi/9droZBcyogs/maxresdefault.jpg",
        width: 1280,
        height: 720,
      },
    },
    channelTitle: "同志社アコースティック音楽P.S.",
    playlistId: "UU9qNGppDijyO8ydJy7UD9Jg",
    position: 0,
    resourceId: { kind: "youtube#video", videoId: "9droZBcyogs" },
    videoOwnerChannelTitle: "同志社アコースティック音楽P.S.",
    videoOwnerChannelId: "UC9qNGppDijyO8ydJy7UD9Jg",
  },
});
