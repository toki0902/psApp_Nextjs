import { playlist, video } from "./playlist";

export type CardMenuOption = {
  addToPlaylist?: true;
  share?: true;
  edit?: true;
  deleteFromPlaylist?: true;
  deletePlaylist?: true;
};

export type MenuDataMap = {
  edit?: playlist;
  deletePlaylist?: playlist;
  deleteFromPlaylist?: video;
  addToPlaylist?: video;
  share?: video;
};
