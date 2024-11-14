import { errorHandler } from "@/src/app/error/errorHandler";
import { UnAuthorizeError } from "@/src/app/error/errors";
import { Video } from "@/src/domain/entities/Video";

export class YoutubeDataSearchRepository {
  fetchAccessToken = async (): Promise<string> => {
    try {
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
        throw errorData;
      }

      const tokenData = await tokenResponse.json();

      return tokenData.access_token;
    } catch (err) {
      throw new UnAuthorizeError(`failed to obtain access token: ${err}`);
    }
  };

  fetchVideoByAccessToken = async (
    accessToken: string,
    keyword: string
  ): Promise<Video[]> => {
    try {
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
          throw JSON.stringify(errorData);
        }

        const statisticsData: YoutubeVideoResponse =
          await statisticsResponse.json();

        return statisticsData.items.map((item) => {
          return Number(item.statistics.viewCount);
        });
      };

      const YoutubeUploadPlaylistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.GOOGLE_UPLOADPLAYLIST_ID}&maxResults=50`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!YoutubeUploadPlaylistResponse.ok) {
        const errorData = await YoutubeUploadPlaylistResponse.json();
        throw JSON.stringify(errorData);
      }

      const uploadPlaylistData: PlaylistItemsResponse =
        await YoutubeUploadPlaylistResponse.json();

      console.log(JSON.stringify(uploadPlaylistData));

      const arr_videoId = uploadPlaylistData.items.map((item) => {
        return item.snippet.resourceId.videoId;
      });

      const arr_viewCount = await fetchViewCountsByVideoIds(arr_videoId);

      const arr_video = uploadPlaylistData.items.map((item, index) => {
        const url = `https://www.youtube.com/watch?v=${arr_videoId[index]}`;
        const views = arr_viewCount[index];
        const thumbnail = item.snippet.thumbnails.default.url;
        const title = item.snippet.title;
        return new Video(url, views, thumbnail, title);
      });

      return arr_video;
    } catch (err) {
      throw new UnAuthorizeError(`failed to fetch video: ${err}`);
    }
  };
}
