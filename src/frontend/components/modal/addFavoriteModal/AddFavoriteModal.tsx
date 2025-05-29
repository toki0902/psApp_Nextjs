"use client";
import React, { useEffect, useState } from "react";
import { playlist } from "../../../types/playlist";
import { Noto_Serif_bold } from "../../../assets/fonts/fonts";
import AddFavoriteItem from "./AddFavoriteItem";

type Props = {
  onPassCheck: (addPlaylistIds: string[]) => void;
  close: () => void;
  payload: { playlists: playlist[] };
};

const AddFavoriteModal = ({ onPassCheck, close, payload }: Props) => {
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<null | boolean>(null);
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
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
        onClick={close}
      ></div>
      <div
        className={`${Noto_Serif_bold.className} fixed left-1/2 top-1/2 z-40 flex max-h-[600px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col border-2 border-red bg-back lg:w-1/2`}
      >
        <div className="fixed left-0 top-0 flex h-fit w-full items-center justify-between p-3 shadow-sm shadow-red">
          <h2 className="text-base font-bold">お気に入りへ追加</h2>
          <div className="relative h-7 w-7 cursor-pointer" onClick={close}>
            <div className="absolute top-1/2 h-[2px] w-full rotate-45 bg-red"></div>
            <div className="absolute top-1/2 h-[2px] w-full -rotate-45 bg-red"></div>
          </div>
        </div>
        <div className="mt-[72px] flex h-fit w-full flex-col space-y-10 overflow-auto px-3 pb-5">
          {payload.playlists.map((playlist) => (
            <AddFavoriteItem
              key={playlist.playlistId}
              id={playlist.playlistId}
              title={playlist.title}
              selectedPlaylistIds={selectedPlaylistIds}
              togglePlaylist={togglePlaylist}
            />
          ))}
        </div>
        <button
          onClick={onClick}
          className="relative mt-6 h-fit w-full border-t border-red py-2 text-red hover:bg-red hover:text-back"
        >
          <p>追加する</p>
          {isValid === false ? (
            <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-[150%] items-center justify-center">
              <div className="relative mr-1 aspect-square w-3 lg:mr-2 lg:w-5">
                <img
                  src="/images/warning.svg"
                  alt="warningIcon"
                  className="h-full w-full"
                />
              </div>
              <p className="line-clamp-2 text-red">
                動画を追加するお気に入りを選択してください。
              </p>
            </div>
          ) : null}
        </button>
      </div>
    </>
  );
};

export default AddFavoriteModal;
