import VideoCard from "@/components/VideoCard";

import { CardMenuOption, playlist, video } from "@/src/frontend/types/playlist";

import { Kaisei } from "@/fonts";
import { notFound } from "next/navigation";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import CardWrapper from "@/src/frontend/components/CardWrapper";

const Playlist = async ({
  params,
}: {
  params: Promise<{ userId: string; playlistTitle: string }>;
}) => {
  const { userId, playlistTitle } = await params;

  await checkSession(userId);

  const cookie = await getAllCookies();

  let videos: { video: video; videoMemberId: number }[] = [
    {
      videoMemberId: 1,
      video: {
        videoId: "HLkbX0YhToY",
        thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
        title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
        url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
        views: 32,
      },
    },
    {
      videoMemberId: 1,
      video: {
        videoId: "HLkbX0YhToY",
        thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
        title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
        url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
        views: 32,
      },
    },
    {
      videoMemberId: 1,
      video: {
        videoId: "HLkbX0YhToY",
        thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
        title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
        url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
        views: 32,
      },
    },
  ];

  const videoResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists/title/${playlistTitle}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!videoResponse.ok) {
    const errorData = await videoResponse.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const playlistData = await videoResponse.json();

    if (!playlistData.playlist) {
      notFound();
    }

    videos = playlistData.playlist.videos;
  }

  let playlists: playlist[] = [];

  //APIリクエスト
  const playlistResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!playlistResponse.ok) {
    const errorData = await playlistResponse.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const playlistData = await playlistResponse.json();

    if (!playlistData.playlists) {
      notFound();
    }

    playlists = playlistData.playlists;
  }

  const cardMenuOption: CardMenuOption = {
    share: true,
    addToPlaylist: true,
    deleteFromPlaylist: true,
  };

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
          <CardWrapper cardMenuOption={cardMenuOption} playlists={playlists}>
            {videos.map((video, index) => {
              return (
                <VideoCard
                  key={index}
                  videoInfo={video.video}
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
