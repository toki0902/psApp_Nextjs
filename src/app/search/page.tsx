import SearchField from "@/components/SearchField";
import VideoCard from "@/components/VideoCard";

import { video } from "@/src/frontend/types/playlist";

import { Kaisei } from "@/fonts";
import ModalWrapper from "@/src/frontend/components/ModalWrapper";
import CardWrapper from "@/src/frontend/components/CardWrapper";
import { CardMenuOption } from "@/src/frontend/types/playlist";

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
    {
      videoId: "HLkbX0YhToY",
      thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
      title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
      url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
      views: 32,
    },
    {
      videoId: "HLkbX0YhToY",
      thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
      title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
      url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
      views: 32,
    },
    {
      videoId: "HLkbX0YhToY",
      thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
      title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
      url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
      views: 32,
    },
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

  // await new Promise((resolve) => setTimeout(resolve, 30000));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/search?q=${query}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
  } else {
    const videoData = await res.json();

    videos = videoData.videos;
  }

  const cardMenuOption: CardMenuOption = {
    edit: true,
    share: true,
    addToPlaylist: true,
    deleteFromPlaylist: true,
    deletePlaylist: true,
  };

  return (
    <div className="w-screen h-screen">
      <ModalWrapper />
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <SearchField value={query}></SearchField>
          <p className={`${Kaisei.className} ml-10 text-2xl`}>の検索結果</p>
          <p className="ml-4 text-mg">{videos.length}件の動画</p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
          <CardWrapper cardMenuOption={cardMenuOption}>
            {videos.map((video) => {
              return (
                <VideoCard
                  key={video.videoId}
                  title={video.title}
                  url={video.url}
                  thumbnail={video.thumbnail}
                  videoId={video.videoId}
                  views={video.views}
                ></VideoCard>
              );
            })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Search;
