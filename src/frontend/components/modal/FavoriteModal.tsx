"use client";
import React, { useEffect, useState } from "react";
import { playlist } from "../../types/playlist";
import { Kaisei } from "../../assets/fonts/fonts";

type props = {
  onPassCheck: (addPlaylistIds: string[]) => void;
  close: () => void;
  playlists: playlist[];
};

const FavoriteModal = ({ onPassCheck, close, playlists }: props) => {
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<null | Boolean>(null);
  let timer: NodeJS.Timeout | null = null;

  const onClick = () => {
    if (!selectedPlaylistIds.length) {
      onInvalid();
    } else {
      onPassCheck(selectedPlaylistIds);
    }
  };

  const onInvalid = () => {
    setIsValid(false);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setIsValid(null);
    }, 5000);
  };

  const togglePlaylist = (playlistId: string) => {
    setSelectedPlaylistIds((prev) => {
      return prev.includes(playlistId)
        ? prev.filter((item) => item !== playlistId)
        : [...prev, playlistId];
    });
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Kaisei.className} justify fixed left-1/2 top-1/2 z-20 flex aspect-[16/9] w-1/2 max-w-[650px] -translate-x-1/2 -translate-y-1/2 transform animate-drop-in-forModal flex-col items-start justify-between overflow-y-auto rounded-xl border-2 border-red bg-back lg:px-7 lg:py-7`}
      >
        <div
          className="absolute right-7 top-7 h-7 w-7 cursor-pointer"
          onClick={close}
        >
          <div className="absolute top-1/2 h-[1px] w-full rotate-45 bg-red"></div>
          <div className="absolute top-1/2 h-[1px] w-full -rotate-45 bg-red"></div>
        </div>
        <h2 className="mb-10 h-fit w-fit text-2xl">お気に入りへ追加</h2>
        <ul className="mb-5 flex w-full flex-wrap items-start">
          {playlists.map((playlist) => (
            <li key={playlist.playlistId} className="mb-5 mr-10 h-fit w-fit">
              <label>
                <input
                  type="checkbox"
                  checked={selectedPlaylistIds.includes(playlist.playlistId)}
                  onChange={() => togglePlaylist(playlist.playlistId)}
                  className="mr-2"
                />
                <span>{playlist.title}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex h-fit w-full justify-end space-x-10">
          <button
            className="h-9 w-fit rounded-md border border-red px-2 text-red hover:bg-red hover:text-back"
            onClick={onClick}
          >
            追加
          </button>
          <button
            className="h-9 w-fit rounded-md border border-red px-2 text-red hover:bg-red hover:text-back"
            onClick={close}
          >
            キャンセル
          </button>
        </div>
        {isValid === false ? (
          <div className="absolute left-7 top-16 flex items-center text-nowrap text-red">
            <img className="mr-2 w-5" src="/images/warning.svg" alt="" />
            <p>動画を追加するお気に入りを選択してください。</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FavoriteModal;
