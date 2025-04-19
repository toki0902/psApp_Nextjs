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
      title: "title",
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
        <div className="justify-left flex w-fit items-end border-b-4 border-red">
          <p className={`${Kaisei.className} text-2xl`}>
            {session?.user.name}さんのお気に入り
          </p>
          <p className="text-mg ml-4">{playlists.length}件のお気に入り</p>
        </div>
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
