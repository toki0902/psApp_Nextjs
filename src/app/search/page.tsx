import VideoCard from "@/src/frontend/components/card/VideoCard";

import { playlist, video } from "@/src/frontend/types/playlist";
import { CardMenuOption } from "@/src/frontend/types/cardMenu";
import CardWrapper from "@/src/frontend/components/card/CardWrapper";

import { Session } from "next-auth";
import { auth } from "@/auth";
import { getAllCookies } from "@/src/frontend/utils/cookie";
import { Kaisei } from "@/src/frontend/assets/fonts/fonts";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  let videos: video[] = [
    {
      videoId: "HLkbX0YhToY",
      thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
      title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
      url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
      views: 32,
    },
  ];
  // {
  //     videoId: "HLkbX0YhToY",
  //     thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
  //     title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
  //     url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
  //     views: 32,
  //   },
  const { q: query } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/search?q=${query}`,
    { method: "GET", headers: { "Content-Type": "application/json" } },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const videoData = await res.json();
    videos = videoData.videos;
  }

  const session: Session | null = await auth();

  const cookie = await getAllCookies();

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
      title: "example",
      playlistId: "easdkfnncksl1",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl2",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl3",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl4",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "exampleskh",
      playlistId: "easdkfnncksl5",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "exampleasdfajsdfa",
      playlistId: "easdkfnncksl6",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl7",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "examdfasdnale",
      playlistId: "easdkfnncksl8",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
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
      title: "example",
      playlistId: "easdkfnncksl9",
      createdAt: "fasdfadsf",
      ownerId: "sqkt5svY5mWFt2i3u1S1g",
    },
  ];

  const playlistResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${session?.user.userId}/playlists`,
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
            userId={session?.user.userId}
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
