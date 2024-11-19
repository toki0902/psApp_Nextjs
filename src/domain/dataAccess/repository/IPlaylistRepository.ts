export interface IPlaylistRepository {
  //サービスでの実装で使用するための型定義をしたい。
  fetchPlaylistByUserId: (
    userId: string
    //一時的にownerIdはnumber
  ) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: number;
      }[]
  >;
  fetchPlaylistMemberIdsByPlaylistId: (
    playlistId: string
  ) => Promise<{ videoId: string; memberId: number }[]>;
}
