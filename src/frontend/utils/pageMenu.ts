import {
  PageMenuOption,
  PageMenuNeedData,
  PageMenuData,
  ExtractNeedData,
} from "../types/pageMenu";

export const generatePageMenuData = <O extends PageMenuOption>(
  option: O,
  needData: PageMenuNeedData<ExtractNeedData<O>>,
): ExtractNeedData<O> => {
  let pageMenuData = {} as any;
  if (option.edit) pageMenuData.edit = needData.thisPlaylistData;

  if (option.create) pageMenuData.create = needData.userId;

  if (option.delete) pageMenuData.delete = needData.thisPlaylistData;

  return pageMenuData;
};
