"use client";
import React, { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import VideoCard from "@/components/VideoCard";

import { video } from "@/src/frontend/types/video";

import { Kaisei } from "@/fonts";
import useLoading from "@/src/frontend/hooks/useLoading";
import { useParams, useRouter } from "next/navigation";

const Playlist = () => {
  const [videos, setVideos] = useState<
    { video: video; videoMemberId: number }[]
  >([
    {
      video: {
        videoId: "HLkbX0YhToY",
        thumbnail: "https://i.ytimg.com/vi/HLkbX0YhToY/sddefault.jpg",
        title: "エマ/go!go!vanillas【2024/08/07 P.S.エレキライブ】",
        url: "https://www.youtube.com/watch?v=HLkbX0YhToY",
        views: 32,
      },
      videoMemberId: 1,
    },
  ]);

  const { status, hideLoading, toHiding, toVisible } = useLoading({
    initialStatus: "visible",
  });

  const { userId, playlistTitle } = useParams();

  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      //ログイン情報を取得、ない場合ログインページへ
      const loginData = { userId: userId };
      if (!loginData) {
        router.push("login");
      }
      //urlのIdとログイン情報を照合、合わない場合notFoundページへ
      if (userId !== loginData.userId) {
        router.push("/notFound");
      }
      //APIリクエスト
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${userId}/playlists/${playlistTitle}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(`${errorData.errorType!}: ${errorData.message}`);
        toHiding();
        return;
      } else {
        const playlistData = await response.json();
        const videos = playlistData.playlist.videos;
        setVideos(videos);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Loading status={status} hideLoading={hideLoading}></Loading>
      <div className="w-full h-full px-[3%] pt-10 flex flex-col">
        <div className="w-full flex justify-left items-end">
          <p className={`${Kaisei.className} ml-10 text-2xl`}>
            {playlistTitle}
          </p>
          <p className="ml-4 text-mg">{videos.length}件の動画</p>
        </div>
        <div className="w-full h-max flex flex-wrap mt-20">
          {videos.map((video) => {
            return (
              <VideoCard
                key={video.video.videoId}
                title={video.video.title}
                url={video.video.url}
                thumbnail={video.video.thumbnail}
                videoId={video.video.videoId}
                views={video.video.views}
                videoMemberId={video.videoMemberId}
              ></VideoCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
