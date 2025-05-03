import { playlist } from "./playlist";

export type PageMenuOption = {
  edit?: true;
  create?: true;
  delete?: true;
};

export type PageMenuData = {
  edit?: playlist;
  create?: string;
  delete?: playlist;
};

export type PageMenuNeedData = {
  userId?: string;
  thisPlaylistData?: playlist;
};
