import { YoutubeDataSearchGateway } from "@/src/backend/infrastructure/gateways/YoutubeDataSearchGateway";
const gateway = new YoutubeDataSearchGateway();
export const GET = async () => {
  const token = await gateway.fetchAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/youtube.channel?part=contentDetails&id=${process.env.GOOGLE_UPLOADPLAYLIST_ID!!}`,
  );

  const data = res.json();
  console.log(JSON.stringify(data));
};
