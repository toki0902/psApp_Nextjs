export interface IPlaylistRepository {
  fetchPlaylistByUserId: (userId: string) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
  >;
  fetchPlaylistMemberIdsByPlaylistId: (
    playlistId: string
  ) => Promise<{ videoId: string; memberId: number }[]>;
  fetchPlaylistIdByPlaylistTitleAndUserId: (
    playlistTitle: string,
    userId: string
  ) => Promise<string>;
  insertPlaylist: (title: string, ownerId: string) => Promise<void>;
  insertPlaylistMember: (videoId: string, playlistId: string) => Promise<void>;
}
