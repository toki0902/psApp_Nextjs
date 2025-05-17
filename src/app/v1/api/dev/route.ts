import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const gateway = new YoutubeDataSearchGateway();
export const GET = async (req: NextRequest) => {
  // const token = await gateway.fetchAccessToken();
  // let playlists: any = [];
  // let nextPageToken = undefined;
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
  console.log(await getToken({ req, secret: process.env.AUTH_SECRET }));
  return new NextResponse(null, { status: 200 });
};
