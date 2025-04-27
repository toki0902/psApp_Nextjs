import { Kaisei } from "@/fonts";
import { auth } from "@/auth";
import { playlist } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import { Session } from "next-auth";
import PlaylistCard from "@/src/frontend/components/card/PlaylistCard";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
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
      ownerId: userId,
      createdAt: "lajdljfas",
    },
  ];

  await checkSession(userId);

  const cookie = await getAllCookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists`,
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

  console.log(`this is playlists : ${JSON.stringify(playlists)}`);

  const cardMenu: CardMenuOption = { edit: true, deletePlaylist: true };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col pt-10">
        <div className="flex w-full justify-between border-b-4 border-red">
          <div className="flex items-end">
            <p className={`${Kaisei.className} text-lg font-bold lg:text-2xl`}>
              {session?.user.name}さんのお気に入り
            </p>
            <p className="text-mg ml-4 hidden lg:block">
              {playlists.length}件のお気に入り
            </p>
          </div>
          <div className="flex space-x-2 py-1 text-red">
            <div className="group flex cursor-pointer items-center overflow-hidden">
              <div className="lg:group-hover:animate-toLeftForFavorite relative h-6 w-6">
                <span className="absolute left-1/2 top-1/2 block h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-red"></span>
                <span className="absolute left-1/2 top-1/2 block h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red"></span>
              </div>
              <p className="lg:group-hover:animate-toUpInForFavorite ml-2 hidden lg:group-hover:block">
                お気に入りを追加
              </p>
            </div>
          </div>
        </div>
        <p className="text-mg lg:hidden">{playlists.length}件のお気に入り</p>
        <div className="mt-10 flex h-max w-full flex-wrap">
          <CardWrapper cardMenuOption={cardMenu} playlists={playlists}>
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
