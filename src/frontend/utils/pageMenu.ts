import {
  PageMenuData,
  PageMenuNeedData,
  PageMenuOption,
} from "../types/pageMenu";

export const generatePageMenuData = (
  option: PageMenuOption,
  needData: PageMenuNeedData,
): PageMenuData => {
  const pageMenuData: PageMenuData = {};
  if (option.edit && needData.thisPlaylistData)
    pageMenuData.edit = needData.thisPlaylistData;

  if (option.create && needData.userId) pageMenuData.create = needData.userId;

  if (option.delete && needData.thisPlaylistData)
    pageMenuData.delete = needData.thisPlaylistData;

  return pageMenuData;
};
