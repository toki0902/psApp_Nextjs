import { playlist } from "./playlist";

type thisPlaylistData = playlist;
type userId = string;

export type PageMenuOption = {
  edit?: true;
  create?: true;
  delete?: true;
};

export type PageMenuData = {
  edit?: thisPlaylistData;
  create?: userId;
  delete?: thisPlaylistData;
};

export type PageMenuNeedMap = {
  userId: string;
  thisPlaylistData: playlist;
};

// ⬅️ option に true が指定されたキーのみ抽出する型
type ValidKeys<O extends PageMenuOption> = {
  [K in keyof O]: O[K] extends true ? K : never;
}[keyof O] &
  keyof PageMenuData;

// ⬅️ option に応じて必要な pageMenuData のキーと型だけ残す = { edit:thisPlaylistData }みたいな型ができた。
export type ExtractNeedData<O extends Partial<PageMenuOption>> = Pick<
  PageMenuData,
  ValidKeys<O>
>;

export type PageMenuNeedData<O extends PageMenuData> = {
  [k in keyof PageMenuNeedMap]: PageMenuNeedMap[k] extends O[keyof O]
    ? k
    : never;
};
