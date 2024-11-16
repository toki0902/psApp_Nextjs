import { UnAuthorizeError } from "@/src/app/error/errors";
import { Video } from "@/src/domain/entities/Video";
import Fuse from "fuse.js";
import { MySQLVideoGateway } from "../gateways/MySQLVideoGateway";

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

  //fix: errorレスポンスがHTML形式っぽい
  fetchVideoByAccessToken = async (accessToken: string): Promise<Video[]> => {
    const videoGateway = new MySQLVideoGateway();
    const cacheId = await videoGateway.fetchValidCacheId();
    if (!cacheId) {
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
          const errorData = await statisticsResponse.text();
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

      const fetchAllVideos = async () => {
        let videos: PlaylistItem[] = [];
        let views: number[] = [];
        let nextPageToken = undefined;

        do {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${
              process.env.GOOGLE_UPLOADPLAYLIST_ID
            }&maxResults=50&pageToken=${nextPageToken || ""}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new UnAuthorizeError(
              `failed to fetch upload playlist${JSON.stringify(errorData)}`
            );
          }

          const data: PlaylistItemsResponse = await response.json();

          const videoIds = data.items.map(
            (item) => item.snippet.resourceId.videoId
          );

          const arr_view = await fetchViewCountsByVideoIds(videoIds);

          videos = [...videos, ...data.items];
          views = [...views, ...arr_view];
          nextPageToken = data.nextPageToken;
        } while (nextPageToken);

        return { videos, views };
      };

      const allVideoData = await fetchAllVideos();

      const uploadPlaylistData: PlaylistItem[] = allVideoData.videos;

      const arr_videoId = uploadPlaylistData.map(
        (item) => item.snippet.resourceId.videoId
      );

      const arr_viewCount = allVideoData.views;

      const arr_video = uploadPlaylistData.map((item, index) => {
        const url = `https://www.youtube.com/watch?v=${arr_videoId[index]}`;
        const views = arr_viewCount[index];
        const thumbnail = item?.snippet?.thumbnails?.default?.url || "";
        const title = item.snippet.title;
        return new Video(url, views, thumbnail, title);
      });

      console.log(arr_video.length);

      await videoGateway.insert(arr_video);

      return arr_video;
    } else {
      const arr_video = await videoGateway.fetchVideosByCacheId(cacheId);

      console.log(arr_video.length);

      return arr_video;
    }
  };

  filterAndSortVideo = async (
    videos: Video[],
    keyword: string
  ): Promise<Video[]> => {
    const fuseOptions = {
      keys: ["title"],
      shouldSort: true,
      threshold: 0.5,
      distance: 100,
    };

    const fuse = new Fuse(videos, fuseOptions);

    const results = fuse.search(keyword);

    return results.map((result) => result.item);
  };
}
