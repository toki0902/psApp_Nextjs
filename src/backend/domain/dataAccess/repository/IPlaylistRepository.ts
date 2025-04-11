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
  fetchPlaylistMembersByPlaylistIds: (
    playlistIds: string[],
  ) => Promise<
    { playlistId: string; videos: { videoId: string; memberId: string }[] }[]
  >;
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
