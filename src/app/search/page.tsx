"use client";
import Loading from "@/src/frontend/components/Loading";
import PasswordModal from "@/src/frontend/components/PasswordModal";
import SearchField from "@/src/frontend/components/SearchField";
import VideoCard from "@/src/frontend/components/VideoCard";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Kaisei } from "@/fonts";
import useLoading from "@/src/frontend/hooks/useLoading";

type video = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
};

const Search = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videos, setVideos] = useState<video[]>([
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
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || undefined;

  const isCookieSet = () => {
    return false;
  };

  const { status, toVisible, toHiding, hideLoading } = useLoading({
    initialStatus: "hidden",
  });

  const fetchVideos = async () => {
    toVisible();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/search?q=${query}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) {
      const errorData = await res.json();
      console.log(`${errorData.errorType!}: ${errorData.message}`);
      toHiding();
      return;
    }

    const videoData = await res.json();
    setVideos(videoData.videos);
    toHiding();
  };

  useEffect(() => {
    if (!isCookieSet()) {
      setIsOpenModal(true);
    } else {
      fetchVideos();
    }
  }, []);

  console.log(videos);
  return (
    <div className="w-screen h-screen">
      {isOpenModal && (
        <PasswordModal
          close={() => {
            router.push("/");
          }}
          onCorrect={() => {
            setIsOpenModal(false);
            fetchVideos();
          }}
        ></PasswordModal>
      )}
      <Loading status={status} hideLoading={hideLoading}></Loading>
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <SearchField value={query}></SearchField>
          <p className={`${Kaisei.className} ml-10 text-2xl`}>の検索結果</p>
          <p className="ml-4 text-mg">{videos.length}件の動画</p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
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
        </div>
      </div>
    </div>
  );
};

export default Search;
