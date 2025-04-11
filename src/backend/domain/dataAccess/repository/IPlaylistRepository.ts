export interface IPlaylistRepository {
  fetchPlaylistsByPlaylistIds: (playlistId: string[]) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
    | undefined
  >;
  fetchPlaylistsByUserId: (userId: string) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
    | undefined
  >;
  fetchPlaylistMemberByPlaylistId: (
    playlistId: string,
  ) => Promise<{ videoId: string; memberId: number }[] | undefined>;
  fetchPlaylistByPlaylistTitleAndUserId: (
    playlistTitle: string,
    userId: string,
  ) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }
    | undefined
  >;
  insertPlaylist: (title: string, ownerId: string) => Promise<void>;
  insertPlaylistMemberByPlaylistIdsAndVideoId: (
    videoId: string,
    playlistIds: string[],
  ) => Promise<void>;
  deletePlaylistByPlaylistId: (playlistId: string) => Promise<void>;
  deletePlaylistMemberByMemberId: (memberId: string) => Promise<void>;
  changePlaylistTitleByPlaylistId: (
    playlistId: string,
    newTitle: string,
  ) => Promise<void>;
}
