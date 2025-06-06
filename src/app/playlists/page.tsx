import { Kaisei } from "@/fonts";
import { auth } from "@/src/backend/interface/auth/auth";
import { playlist } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";
import { getAllCookies } from "@/src/frontend/utils/cookie.server";
import { Session } from "next-auth";
import PlaylistCard from "@/src/frontend/components/card/PlaylistCard";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";
import {
  PageMenuNeedData,
  PageMenuOption,
} from "@/src/frontend/types/pageMenu";

import PageMenu from "@/src/frontend/components/pageMenu/PageMenu";

const page = async () => {
  const session: Session | null = await auth();

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
      ownerId: session?.userId ?? "",
      createdAt: "lajdljfas",
    },
  ];

  const cookie = await getAllCookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL ?? window.location.origin}/v1/api/users/me/playlists`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const playlistData = await res.json();
    playlists = playlistData.playlists;
  }

  const cardMenuOption: CardMenuOption = { edit: true, deletePlaylist: true };

  const pageMenuOption: PageMenuOption = { create: true };
  const pageMenuNeedData: PageMenuNeedData = { userId: session?.userId };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col pt-10">
        <div className="flex w-full justify-between border-b-4 border-red">
          <div className="flex w-[85%] items-end">
            <p
              className={`${Kaisei.className} line-clamp-1 text-lg font-bold lg:text-2xl`}
            >
              お気に入り
            </p>
            <p className="text-mg ml-4 hidden min-w-fit lg:block">
              {playlists.length}件のお気に入り
            </p>
          </div>
          <PageMenu
            pageMenuOption={pageMenuOption}
            pageMenuNeedData={pageMenuNeedData}
          />
        </div>
        <p className="text-mg lg:hidden">{playlists.length}件のお気に入り</p>
        <div className="mt-10 flex h-max w-full flex-wrap">
          <CardWrapper cardMenuOption={cardMenuOption} playlists={playlists}>
            {playlists.map((playlist) => {
              return (
                <PlaylistCard
                  key={playlist.playlistId}
                  playlistInfo={playlist}
                />
              );
            })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default page;
