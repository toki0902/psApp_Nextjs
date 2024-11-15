import { UnAuthorizeError } from "@/src/app/error/errors";
import { Video } from "@/src/domain/entities/Video";
import Fuse from "fuse.js";

export class YoutubeDataSearchRepository {
  fetchAccessToken = async (): Promise<string> => {
    const tokenFetchBody = new URLSearchParams({
      client_id: process.env.GOOGLE_PS_CLIENT || "",
      client_secret: process.env.GOOGLE_PS_SECRET || "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
      grant_type: "refresh_token",
    });

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: tokenFetchBody.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!tokenResponse.ok) {
      const errorData = tokenResponse.json();
      throw new UnAuthorizeError(
        `failed to fetch token ${JSON.stringify(errorData)}`
      );
    }

    const tokenData = await tokenResponse.json();

    return tokenData.access_token;
  };

  fetchVideoByAccessToken = async (accessToken: string): Promise<Video[]> => {
    const fetchViewCountsByVideoIds = async (
      videoIds: (string | undefined)[]
    ) => {
      if (!videoIds.length) {
        return [];
      }

      const statisticsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(
          ","
        )}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!statisticsResponse.ok) {
        const errorData = await statisticsResponse.json();
        throw new UnAuthorizeError(
          `failed to fetch video statistics: ${JSON.stringify(errorData)}`
        );
      }

      const statisticsData: YoutubeVideoResponse =
        await statisticsResponse.json();

      return statisticsData.items.map((item) => {
        return Number(item.statistics.viewCount);
      });
    };

    const YoutubeUploadPlaylistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.GOOGLE_UPLOADPLAYLIST_ID}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!YoutubeUploadPlaylistResponse.ok) {
      const errorData = await YoutubeUploadPlaylistResponse.json();
      throw new UnAuthorizeError(
        `failed to fetch upload playlist${JSON.stringify(errorData)}`
      );
    }

    const uploadPlaylistData: PlaylistItemsResponse =
      await YoutubeUploadPlaylistResponse.json();

    const arr_videoId = uploadPlaylistData.items.map((item) => {
      return item.snippet.resourceId.videoId;
    });

    console.log(arr_videoId);

    const arr_viewCount = await fetchViewCountsByVideoIds(arr_videoId);

    const arr_video = uploadPlaylistData.items.map((item, index) => {
      const url = `https://www.youtube.com/watch?v=${arr_videoId[index]}`;
      const views = arr_viewCount[index];
      const thumbnail = item.snippet.thumbnails.default.url;
      const title = item.snippet.title;
      return new Video(url, views, thumbnail, title);
    });

    return arr_video;
  };

  filterAndSortVideo = async (
    videos: Video[],
    keyword: string
  ): Promise<Video[]> => {
    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.8,
      distance: 100,
    };

    const fuse = new Fuse(videos, fuseOptions);

    const results = fuse.search(keyword);

    return results.map((result) => result.item);
  };
}
