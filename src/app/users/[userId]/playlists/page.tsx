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
      videos: [],
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
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-col px-[3%] pt-10">
        <div className="justify-left flex w-full items-end">
          <p className={`${Kaisei.className} ml-10 text-2xl`}>
            {session?.user.name}さんのお気に入り
          </p>
          <p className="text-mg ml-4">{playlists.length}件のお気に入り</p>
        </div>
        <div className="mt-20 flex h-max w-full flex-wrap">
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
