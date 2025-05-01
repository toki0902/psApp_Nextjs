import React from "react";

const FavoriteItemToAdd = ({
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
    <li
      key={id}
      className="group ml-2 flex w-full items-center py-1 hover:bg-red hover:text-back lg:hidden"
    >
      <img
        src={
          selectedPlaylistIds.includes(id)
            ? "/images/checked_f1EBE5.svg"
            : "/images/checkbox_f1EBE5.svg"
        }
        className="aspect-square w-4 cursor-pointer"
        onClick={() => togglePlaylist(id)}
      />
      <p
        className="w-fit cursor-pointer px-2"
        onClick={() => togglePlaylist(id)}
      >
        {title}
      </p>
    </li>
  );
};

export default FavoriteItemToAdd;
