import React from "react";

type Props = {
  videoId: string;
  views: number;
  url: string;
  thumbnail: string;
  title: string;
  videoMemberId?: number;
};

const VideoCard = ({
  videoId,
  views,
  url,
  thumbnail,
  title,
  videoMemberId,
}: Props) => {
  return (
    <a
      href={url}
      className="4xl:w-sixth-divided 3xl:w-fifth-divided 2xl:w-fourth-divided lg:w-third-divided sm:w-half-divided mx-[calc(0.5%)] mb-10 cursor-pointer rounded-lg transition-all hover:-translate-y-1"
    >
      <div className="w-full aspect-[16/9]">
        <img
          src={thumbnail}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full p-2 flex">
        <div className="w-[90%] h-full">
          <p className="line-clamp-3">{title}</p>
          <p className="mt-2 text-sm">{views} 回視聴</p>
        </div>
        <div className="w-[10%] flex justify-center items-start">
          <div className="w-2/3 aspect-square rounded-full border border-black hover:bg-gray-400 relative"></div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
