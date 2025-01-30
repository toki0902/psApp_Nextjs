"use client";
import React, { useState } from "react";

import Loading from "@/components/Loading";
import VideoCard from "@/components/VideoCard";

import { video } from "@/src/frontend/types/video";

import { Kaisei } from "@/fonts";
import useLoading from "@/src/frontend/hooks/useLoading";

const Playlist = () => {
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
  ]);
  const { status, hideLoading, toHiding, toVisible } = useLoading({
    initialStatus: "hidden",
  });

  return (
    <div className="w-screen h-screen">
      <Loading status={status} hideLoading={hideLoading}></Loading>
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <p className={`${Kaisei.className} ml-10 text-2xl`}>再生リスト名</p>
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

export default Playlist;
