import { UnAuthorizeError } from "@/src/app/error/errors";
import { Video } from "@/src/domain/entities/Video";

export class YoutubeDataSearchGateway {
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
  fetchAllVideoByAccessToken = async (
    accessToken: string
  ): Promise<Video[]> => {
    const fetchViewCountsByVideoIds = async (
      videoIds: (string | undefined)[]
    ) => {
      if (!videoIds.length) {
        return [];
      }

      const statisticsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(
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
          `failed to fetch video statistics in process 'fetchAllVideoByAccessToken': ${JSON.stringify(
            errorData
          )}`
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
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new UnAuthorizeError(
            `failed to fetch upload playlist in process'fetchAllVideoByAccessToken${JSON.stringify(
              errorData
            )}`
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
      const videoId = arr_videoId[index];
      const views = arr_viewCount[index];
      const thumbnail = item?.snippet?.thumbnails?.default?.url || "";
      const title = item.snippet.title;
      return new Video(videoId, views, thumbnail, title);
    });

    console.log(arr_video.length);

    return arr_video;
  };

  fetchVideoByVideoIds = async (videoIds: string[], accessToken: string) => {
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(
        ","
      )}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!videoResponse.ok) {
      const errorData = await videoResponse.text();
      throw new UnAuthorizeError(
        `failed to fetch video in process 'fetchVideoByVideoIds': ${JSON.stringify(
          errorData
        )}`
      );
    }

    const videoData: YoutubeVideoResponse = await videoResponse.json();
    console.log(JSON.stringify(videoData));
    return videoData.items.map((item) => {
      return new Video(
        item.id || "",
        Number(item.statistics?.viewCount) || 0,
        item.snippet?.thumbnails.default.url || "",
        item.snippet?.title || ""
      );
    });
  };
}

[
  {
    kind: "youtube#video",
    etag: "HCZkf3DWRRb-tJbpBEJqn6t76f8",
    id: "VEYLDC2njbI",
    snippet: {
      publishedAt: "2023-10-29T14:03:23Z",
      channelId: "UC9qNGppDijyO8ydJy7UD9Jg",
      title: "バラの花/くるり【2023/10/07 P.S.10月ミニライブ】",
      description: "【2023/10/07 P.S.10月ミニライブ】\nなんとか社会人",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/VEYLDC2njbI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/VEYLDC2njbI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/VEYLDC2njbI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/VEYLDC2njbI/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/VEYLDC2njbI/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "同志社アコースティック音楽P.S.",
      categoryId: "10",
      liveBroadcastContent: "none",
      localized: {
        title: "バラの花/くるり【2023/10/07 P.S.10月ミニライブ】",
        description: "【2023/10/07 P.S.10月ミニライブ】\nなんとか社会人",
      },
    },
    statistics: {
      viewCount: "13",
      likeCount: "0",
      dislikeCount: "0",
      favoriteCount: "0",
      commentCount: "0",
    },
  },
  {
    kind: "youtube#video",
    etag: "4u6tv4VUtoXZKUiCoTndp95-IZo",
    id: "nBc7SEzsvSE",
    snippet: {
      publishedAt: "2019-11-27T14:40:38Z",
      channelId: "UC9qNGppDijyO8ydJy7UD9Jg",
      title: "ばらの花/くるり【2019年度　同志社EVE２日目】",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/nBc7SEzsvSE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/nBc7SEzsvSE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/nBc7SEzsvSE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/nBc7SEzsvSE/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/nBc7SEzsvSE/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "同志社アコースティック音楽P.S.",
      categoryId: "10",
      liveBroadcastContent: "none",
      localized: {
        title: "ばらの花/くるり【2019年度　同志社EVE２日目】",
        description: "",
      },
    },
    statistics: {
      viewCount: "382",
      likeCount: "13",
      dislikeCount: "0",
      favoriteCount: "0",
      commentCount: "1",
    },
  },
];
