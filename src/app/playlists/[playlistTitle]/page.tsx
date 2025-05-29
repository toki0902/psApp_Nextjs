import VideoCard from "@/src/frontend/components/card/VideoCard";

import { playlist } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";

import { Kaisei } from "@/fonts";
import { getAllCookies } from "@/src/frontend/utils/cookie.server";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";
import {
  PageMenuNeedData,
  PageMenuOption,
} from "@/src/frontend/types/pageMenu";
import PageMenu from "@/src/frontend/components/pageMenu/PageMenu";
import { auth } from "@/src/backend/interface/auth/auth";
import { notFound } from "next/navigation";

//直し
const Playlist = async ({
  params,
}: {
  params: Promise<{ playlistTitle: string }>;
}) => {
  const { playlistTitle: beforePlaylistTitle } = await params;

  const playlistTitle = decodeURIComponent(beforePlaylistTitle);

  const session = await auth();

  const cookie = await getAllCookies();

  let playlist: playlist | null = null;

  const videoResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL ?? window.location.origin}/v1/api/users/me/playlists/title/${beforePlaylistTitle}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!videoResponse.ok) {
    const errorData = await videoResponse.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    notFound();
  } else {
    const playlistData = await videoResponse.json();
    if (!playlistData.playlist) {
      return;
    }
    playlist = playlistData.playlist;
  }

  let playlists: playlist[] = [];

  //APIリクエスト
  const playlistResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL ?? window.location.origin}/v1/api/users/me/playlists`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!playlistResponse.ok) {
    const errorData = await playlistResponse.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const playlistData = await playlistResponse.json();

    if (!playlistData.playlists) {
      return;
    }

    playlists = playlistData.playlists;
  }

  const cardMenuOption: CardMenuOption = {
    share: true,
    addFavorite: true,
    deleteFromPlaylist: true,
  };

  const pageMenuOption: PageMenuOption = { edit: true, delete: true };
  const pageMenuNeedData: PageMenuNeedData = {
    userId: session?.userId,
    thisPlaylistData: playlist ? playlist : undefined,
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col pt-10">
        <div className="flex justify-between border-b-4 border-red">
          <div className="flex w-[85%] items-end">
            <p
              className={`${Kaisei.className} truncate text-lg font-bold lg:text-2xl`}
            >
              {playlistTitle}
            </p>
            <p className="text-mg ml-4 hidden min-w-fit lg:block">
              {(playlist?.videos || []).length}件の動画
            </p>
          </div>
          <PageMenu
            pageMenuOption={pageMenuOption}
            pageMenuNeedData={pageMenuNeedData}
          />
        </div>
        <p className="text-mg lg:hidden">
          {(playlist?.videos || []).length}件の動画
        </p>
        <div className="mt-10 flex h-max w-full flex-wrap">
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
                />
              );
            })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
