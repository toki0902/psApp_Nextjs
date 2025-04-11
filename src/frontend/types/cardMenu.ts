import { playlist, video } from "./playlist";

export type CardMenuOption = {
  addFavorite?: true;
  share?: true;
  edit?: true;
  deleteFromPlaylist?: true;
  deletePlaylist?: true;
};

export type MenuDataMap = {
  edit?: playlist;
  deletePlaylist?: playlist;
  deleteFromPlaylist?: video;
  addFavorite?: video;
  share?: video;
};
