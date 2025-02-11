import React from "react";
import { video } from "../types/playlist";
import { redirect } from "next/navigation";

type Props = {
  playlistTitle: string;
  videos: { video: video; videoMemberId: number }[];
  playlistId: string;
  ownerId: string;
  createdAt: string;
};

const PlaylistCard = ({
  playlistTitle,
  playlistId,
  videos,
  ownerId,
  createdAt,
}: Props) => {
  const onClick = redirect(`/users/${ownerId}/playlists/${playlistTitle}`);
  return (
    <div
      onClick={onClick}
      className="4xl:w-sixth-divided 3xl:w-fifth-divided 2xl:w-fourth-divided lg:w-third-divided sm:w-half-divided mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg transition-all hover:-translate-y-1"
    >
      <div className="w-full aspect-[16/9]">
        <img
          src={undefined}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full p-2 flex">
        <div className="w-[90%] h-full">
          <p className="line-clamp-3">{playlistTitle}</p>
        </div>
        <div className="w-[10%] flex justify-center items-start">
          <div className="w-2/3 aspect-square rounded-full border border-black hover:bg-gray-400 relative"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
