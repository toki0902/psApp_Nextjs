"use client";
import React, { useState } from "react";
import { playlist } from "../../types/playlist";
import { Kaisei } from "../../assets/fonts/fonts";

type props = {
  onPassCheck: (addPlaylistIds: string[]) => void;
  close: () => void;
  playlists: playlist[];
};

const FavoriteModal = ({ onPassCheck, close, playlists }: props) => {
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]);

  const togglePlaylist = (playlistId: string) => {
    setSelectedPlaylistIds((prev) => {
      return prev.includes(playlistId)
        ? prev.filter((item) => item !== playlistId)
        : [...prev, playlistId];
    });
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} animate-drop-in-forModal fixed left-1/2 top-1/2 z-20 flex aspect-[16/9] w-1/2 max-w-[750px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-between rounded-xl border-2 border-red bg-back py-16 xl:py-24`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2>どのお気に入りに追加しますか？</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.playlistId}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPlaylistIds.includes(playlist.playlistId)}
                  onChange={() => togglePlaylist(playlist.playlistId)}
                />
                <span>{playlist.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavoriteModal;
