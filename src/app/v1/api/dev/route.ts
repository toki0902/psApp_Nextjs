import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";
import { NextResponse } from "next/server";
const gateway = new YoutubeDataSearchGateway();
export const GET = async () => {
  const token = await gateway.fetchAccessToken();
  let playlists: any = [];
  let nextPageToken = undefined;

  // do {
  //   const allPlaylistRes: any = await fetch(
  //     `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50&pageToken=${nextPageToken || ""}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   );

  //   const data = await res.json();
  //   console.log(data);
  //   playlists = [...playlists, ...data.items];
  //   nextPageToken = data.nextPageToken;
  // } while (nextPageToken);
  do {
    const allPlaylistRes: any = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50&pageToken=${nextPageToken || ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await allPlaylistRes.json();
    console.log(data);
    playlists = [...playlists, ...data.items];
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return new NextResponse(JSON.stringify(playlists, null, 2), { status: 200 });
};
