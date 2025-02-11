import { Kaisei } from "@/fonts";
import { auth } from "@/auth";
import { playlist } from "@/src/frontend/types/playlist";
import { checkSession, getAllCookies } from "@/src/frontend/utils/cookie";
import { Session } from "next-auth";
import PlaylistCard from "@/src/frontend/components/PlaylistCard";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  let playlists: playlist[] = [];
  const { userId } = await params;
  const session: Session | null = await auth();

  await checkSession(userId);

  const cookie = await getAllCookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    return;
  } else {
    const playlistData = await res.json();
    playlists = playlistData.playlists;
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <p className={`${Kaisei.className} ml-10 text-2xl`}>
            {session?.user.name}さんのお気に入り
          </p>
          <p className="ml-4 text-mg">{playlists.length}件のお気に入り</p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
          {playlists.map((playlist) => {
            return (
              <PlaylistCard
                playlistId={playlist.playlistId}
                playlistTitle={playlist.playlistTitle}
                ownerId={playlist.ownerId}
                createdAt={playlist.createdAt}
                videos={playlist.videos}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
