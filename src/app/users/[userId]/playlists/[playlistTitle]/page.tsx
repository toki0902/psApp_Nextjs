import VideoCard from "@/src/frontend/components/card/VideoCard";

import { playlist, video } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";

import { Kaisei } from "@/fonts";
import { notFound } from "next/navigation";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";
import ModalWrapper from "@/src/frontend/components/modal/ModalWrapper";
import { modalOption } from "@/src/frontend/types/modal";

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
    },
  );

  if (!videoResponse.ok) {
    const errorData = await videoResponse.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    // notFound();
  } else {
    const playlistData = await videoResponse.json();

    if (!playlistData.playlist) {
      notFound();
    }

    playlist = playlistData.playlist;
  }

  let playlists: playlist[] = [
    {
      videos: [
        {
          video: {
            videoId: "HLkbX0YhToY",
            thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
            title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
            url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
            views: 32,
          },
          videoMemberId: "sagadgaasd",
        },
      ],
      title: "何",
      playlistId: "safasdfasdhnom",
      ownerId: userId,
      createdAt: "lajdljfas",
    },
  ];

  //APIリクエスト
  const playlistResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists`,
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
      notFound();
    }

    playlists = playlistData.playlists;
  }

  const cardMenuOption: CardMenuOption = {
    share: true,
    addFavorite: true,
    deleteFromPlaylist: true,
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col pt-10">
        <div className="flex w-full justify-between border-b-4 border-red">
          <div className="flex items-end">
            <p className={`${Kaisei.className} text-lg font-bold lg:text-2xl`}>
              {playlistTitle}
            </p>
            <p className="text-mg ml-4 hidden lg:block">
              {(playlist?.videos || []).length}件の動画
            </p>
          </div>
          <div className="flex space-x-2 py-1 text-red">
            <div className="group flex cursor-pointer items-center overflow-hidden">
              <img
                src="/images/edit_823A42.svg"
                alt=""
                className="lg:group-hover:animate-toLeftForFavorite relative h-6 w-6"
              />
              <p className="lg:group-hover:animate-toUpInForFavorite ml-2 hidden lg:group-hover:block">
                編集する
              </p>
            </div>
            <div className="group flex cursor-pointer items-center overflow-hidden">
              <img
                src="/images/delete_823A42.svg"
                alt=""
                className="lg:group-hover:animate-toLeftForFavorite relative h-6 w-6"
              />
              <p className="lg:group-hover:animate-toUpInForFavorite ml-2 hidden lg:group-hover:block">
                {playlist?.title}を削除する
              </p>
            </div>
          </div>
        </div>
        <p className="text-mg lg:hidden">
          {(playlist?.videos || []).length}件の動画
        </p>
        <div className="mt-20 flex h-max w-full flex-wrap">
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
