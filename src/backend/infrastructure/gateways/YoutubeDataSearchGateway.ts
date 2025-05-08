import { UnAuthorizeError } from "@/src/app/error/errors";
import { Video } from "@/src/backend/domain/entities/Video";
import {
  PlaylistItem,
  PlaylistItemsResponse,
  YoutubeVideoResponse,
} from "../type";

export class YoutubeDataSearchGateway {
  fetchAccessToken = async (): Promise<string> => {
    const tokenFetchBody = new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID || "",
      client_secret: process.env.AUTH_GOOGLE_SECRET || "",
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
        "googleトークンを取得できません。",
        `failed to fetch token ${JSON.stringify(errorData)}`,
      );
    }

    const tokenData = await tokenResponse.json();

    return tokenData.access_token;
  };

  //fix: errorレスポンスがHTML形式っぽい
  fetchAllVideoByAccessToken = async (
    accessToken: string,
  ): Promise<Video[]> => {
    const fetchViewCountsByVideoIds = async (
      videoIds: (string | undefined)[],
    ) => {
      if (!videoIds.length) {
        return [];
      }

      const statisticsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(
          ",",
        )}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (!statisticsResponse.ok) {
        const errorData = await statisticsResponse.text();
        throw new UnAuthorizeError(
          "ビデオの詳細情報取得に失敗しました。",
          `failed to fetch video statistics in process 'fetchAllVideoByAccessToken': ${JSON.stringify(
            errorData,
          )}`,
        );
      }

      const statisticsData: YoutubeVideoResponse =
        await statisticsResponse.json();

      return statisticsData.items.map((item) => {
        return Number(item.statistics?.viewCount) || 0;
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
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new UnAuthorizeError(
            "アップロードプレイリスト取得に失敗しました。",
            `failed to fetch upload playlist in process 'fetchAllVideoByAccessToken': ${JSON.stringify(
              errorData,
            )}`,
          );
        }

        const data: PlaylistItemsResponse = await response.json();

        const videoIds = data.items.map(
          (item) => item.snippet.resourceId.videoId,
        );

        const arr_view = await fetchViewCountsByVideoIds(videoIds);

        videos = [...videos, ...data.items];
        views = [...views, ...arr_view];
        nextPageToken = data.nextPageToken;
      } while (nextPageToken);

      const returnObj = videos.map((video, index) => {
        return {
          video: video,
          view: views[index],
        };
      });

      return returnObj;
    };

    const allVideoData = await fetchAllVideos();

    const seen = new Set();

    const videoDataWithoutDuplicates = allVideoData.filter((video) => {
      const videoId = video.video.snippet.resourceId.videoId;
      return seen.has(videoId) ? false : seen.add(videoId);
    });

    const arr_videoId = videoDataWithoutDuplicates.map(
      (item) => item.video.snippet.resourceId.videoId,
    );

    const arr_viewCount = videoDataWithoutDuplicates.map((item) => item.view);

    const arr_video = videoDataWithoutDuplicates.map((item, index) => {
      const videoId = arr_videoId[index];
      const views = arr_viewCount[index];
      const thumbnail = item?.video?.snippet?.thumbnails?.standard?.url || "";
      const title = item.video.snippet.title;
      return new Video(videoId, views, thumbnail, title);
    });

    console.log(arr_video.length);

    return arr_video;
  };

  fetchVideoByVideoIds = async (
    videoIds: string[],
    accessToken: string,
  ): Promise<Video[]> => {
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(
        ",",
      )}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!videoResponse.ok) {
      const errorData = await videoResponse.text();
      throw new UnAuthorizeError(
        "ビデオ情報取得に失敗しました。",
        `failed to fetch video in process 'fetchVideoByVideoIds': ${JSON.stringify(
          errorData,
        )}`,
      );
    }

    const videoData: YoutubeVideoResponse = await videoResponse.json();
    console.log(JSON.stringify(videoData));
    return videoData.items.map((item) => {
      return new Video(
        item.id || "",
        Number(item.statistics?.viewCount) || 0,
        item.snippet?.thumbnails.standard?.url || "",
        item.snippet?.title || "",
      );
    });
  };
}
