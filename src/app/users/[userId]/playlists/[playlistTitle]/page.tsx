import VideoCard from "@/components/VideoCard";

import { CardMenuOption, video } from "@/src/frontend/types/playlist";

import { Kaisei } from "@/fonts";
import { notFound } from "next/navigation";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import CardWrapper from "@/src/frontend/components/CardWrapper";

const Playlist = async ({
  params,
}: {
  params: Promise<{ userId: string; playlistTitle: string }>;
}) => {
  let videos: { video: video; videoMemberId: number }[] = [];
  const { userId, playlistTitle } = await params;

  await checkSession(userId);

  const cookie = await getAllCookies();

  //APIリクエスト
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists/${playlistTitle}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    return;
  } else {
    const playlistData = await response.json();

    if (!playlistData.playlist) {
      notFound();
    }
    videos = playlistData.playlist.videos;
  }

  const cardMenuOption: CardMenuOption = { share: true, addToPlaylist: true };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <p className={`${Kaisei.className} ml-10 text-2xl`}>
            {playlistTitle}
          </p>
          <p className="ml-4 text-mg">{videos.length}件の動画</p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
          <CardWrapper cardMenuOption={cardMenuOption}>
            {videos.map((video) => {
              return (
                <VideoCard
                  key={video.video.videoId}
                  title={video.video.title}
                  url={video.video.url}
                  thumbnail={video.video.thumbnail}
                  videoId={video.video.videoId}
                  views={video.video.views}
                  videoMemberId={video.videoMemberId}
                ></VideoCard>
              );
            })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};
export default Playlist;
