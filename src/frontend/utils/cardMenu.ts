import {
  CardMenuData,
  CardMenuOption,
  CardMenuNeedData,
} from "../types/cardMenu";

export const generateCardMenuData = (
  options: CardMenuOption,
  needData: CardMenuNeedData,
): CardMenuData => {
  // 実装
  const data: CardMenuData = {};
  if (
    options.addFavorite &&
    needData.userPlaylistsInfo &&
    needData.thisVideoInfo
  ) {
    data.addFavorite = {
      userPlaylistsInfo: needData.userPlaylistsInfo,
      thisVideoInfo: needData.thisVideoInfo,
    };
  }

  if (options.share && needData.thisVideoInfo) {
    data.share = needData.thisVideoInfo;
  }

  if (options.edit && needData.thisPlaylistInfo) {
    data.edit = needData.thisPlaylistInfo;
  }

  if (
    options.deleteFromPlaylist &&
    needData.ownerPlaylistInfo &&
    needData.memberId
  ) {
    data.deleteFromPlaylist = {
      ownerPlaylistInfo: needData.ownerPlaylistInfo,
      memberId: needData.memberId,
    };
  }

  if (options.deletePlaylist && needData.thisPlaylistInfo) {
    data.deletePlaylist = needData.thisPlaylistInfo;
  }

  return data;
};
