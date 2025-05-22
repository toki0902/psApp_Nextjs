import VideoCard from "@/src/frontend/components/card/VideoCard";

import { playlist, video } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";

import { Session } from "next-auth";
import { auth } from "@/src/backend/interface/auth/auth";
import { getAllCookies } from "@/src/frontend/utils/cookie";
import { Kaisei } from "@/src/frontend/assets/fonts/fonts";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; isAllVideo: string }>;
}) => {
  let videos: video[] = [];

  const { q: query, isAllVideo } = await searchParams;

  const cookie = await getAllCookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/search?q=${query}${isAllVideo ? "&isAllVideo=true" : ""}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const videoData = await res.json();
    videos = videoData.videos;
  }

  const session: Session | null = await auth();

  let playlists: playlist[] = [];

  const playlistResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${session?.userId}/playlists`,
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
    playlists = playlistData.playlists;
  }

  const cardMenuOption: CardMenuOption = {
    share: true,
    addFavorite: true,
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col pt-10">
        <div className="flex w-full justify-between border-b-4 border-red">
          <div className="flex items-end">
            <p className={`${Kaisei.className} text-lg font-bold lg:text-2xl`}>
              検索結果
            </p>
            <p className="text-mg ml-4 hidden lg:block">
              {videos.length}件の動画
            </p>
          </div>
        </div>
        <p className="text-mg lg:hidden">{videos.length}件の動画</p>
        <div className="mt-10 flex h-max w-full flex-wrap">
          <CardWrapper
            cardMenuOption={cardMenuOption}
            playlists={playlists}
            userId={session?.userId}
          >
            {videos.map((video, index) => {
              return <VideoCard key={index} videoInfo={video} />;
            })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Search;
