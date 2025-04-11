import { CardMenuOption, MenuDataMap } from "../types/cardMenu";
import { playlist, video } from "../types/playlist";

export const generateMenuDataMap = (
  options: CardMenuOption,
  playlistInfo?: playlist,
  videoInfo?: video,
): MenuDataMap => {
  const data: MenuDataMap = {};

  if (options.edit && playlistInfo) data.edit = playlistInfo;
  if (options.deletePlaylist && playlistInfo)
    data.deletePlaylist = playlistInfo;
  if (options.deleteFromPlaylist && videoInfo) {
    data.deleteFromPlaylist = videoInfo;
  }
  if (options.addFavorite && videoInfo) data.addFavorite = videoInfo;
  if (options.share && videoInfo) data.share = videoInfo;

  return data;
};
