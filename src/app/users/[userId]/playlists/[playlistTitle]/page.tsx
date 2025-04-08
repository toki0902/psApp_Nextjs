import VideoCard from "@/src/frontend/components/card/VideoCard";

import { playlist, video } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";

import { Kaisei } from "@/fonts";
import { notFound } from "next/navigation";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";

const Playlist = async ({
  params,
}: {
  params: Promise<{ userId: string; playlistTitle: string }>;
}) => {
  const { userId, playlistTitle } = await params;

  await checkSession(userId);

  const cookie = await getAllCookies();

  let playlist: playlist | null = null;

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
    notFound();
  } else {
    const playlistData = await videoResponse.json();

    if (!playlistData.playlist) {
      notFound();
    }

    playlist = playlistData.playlist;
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
          <p className="ml-4 text-mg">
            {(playlist?.videos || []).length}件の動画
          </p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
          <CardWrapper
            cardMenuOption={cardMenuOption}
            playlists={playlists}
            ownerPlaylist={playlist || undefined}
          >
            {(playlist?.videos || []).map((video, index) => {
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
