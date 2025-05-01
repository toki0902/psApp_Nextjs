import { playlist, video } from "./playlist";

export type CardMenuOption = {
  addFavorite?: true;
  share?: true;
  edit?: true;
  deleteFromPlaylist?: true;
  deletePlaylist?: true;
};

export type CardMenuData = {
  addFavorite?: {
    userPlaylistsInfo: userPlaylistsInfo;
    thisVideoInfo: thisVideoInfo;
  };
  share?: thisVideoInfo;
  edit?: thisPlaylistInfo;
  deleteFromPlaylist?: {
    ownerPlaylistInfo: ownerPlaylistInfo;
    memberId: memberId;
  };
  deletePlaylist?: thisPlaylistInfo;
};

type thisVideoInfo = video;
type thisPlaylistInfo = playlist;
type userPlaylistsInfo = playlist[];
type ownerPlaylistInfo = playlist;
type memberId = string;

export type CardMenuNeedData = {
  thisVideoInfo?: thisVideoInfo;
  thisPlaylistInfo?: thisPlaylistInfo;
  userPlaylistsInfo?: userPlaylistsInfo;
  ownerPlaylistInfo?: ownerPlaylistInfo;
  memberId?: memberId;
};

//作りたい完成形は{ ownerPlaylistInfo: ownerPlaylistInfo, memberId: memberId }みたいな感じ
