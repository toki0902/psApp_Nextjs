import React from "react";

const AddFavoriteItem = ({
  id,
  selectedPlaylistIds,
  togglePlaylist,
  title,
}: {
  id: string;
  selectedPlaylistIds: string[];
  togglePlaylist: (id: string) => void;
  title: string;
}) => {
  return (
    <li key={id} className="group flex w-full items-center">
      <div
        className="relative aspect-square w-5 cursor-pointer"
        onClick={() => togglePlaylist(id)}
      >
        <img
          src={
            selectedPlaylistIds.includes(id)
              ? "/images/checked_823A42.svg"
              : "/images/checkbox_823A42.svg"
          }
          alt="checkIcon"
          className="h-full w-full"
        />
      </div>
      <p
        className="w-full cursor-pointer overflow-hidden truncate px-2"
        onClick={() => togglePlaylist(id)}
      >
        {title}
      </p>
    </li>
  );
};

export default AddFavoriteItem;
