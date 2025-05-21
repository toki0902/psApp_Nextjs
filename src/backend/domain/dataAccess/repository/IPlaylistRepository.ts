import { Connection } from "mysql2/promise";

export interface IPlaylistRepository {
  fetchPlaylistsByPlaylistIds: (
    conn: Connection,
    playlistId: string[],
  ) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
    | undefined
  >;
  fetchPlaylistsByUserId: (
    conn: Connection,
    userId: string,
  ) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }[]
    | undefined
  >;
  fetchPlaylistMembersByPlaylistIds: (
    conn: Connection,
    playlistIds: string[],
  ) => Promise<
    { playlistId: string; videos: { videoId: string; memberId: string }[] }[]
  >;
  fetchPlaylistByPlaylistTitleAndUserId: (
    conn: Connection,
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
  insertPlaylist: (
    conn: Connection,
    title: string,
    ownerId: string,
  ) => Promise<void>;
  insertPlaylistMemberByPlaylistIdsAndVideoId: (
    conn: Connection,
    videoId: string,
    playlistIds: string[],
  ) => Promise<void>;
  deletePlaylistByPlaylistId: (
    conn: Connection,
    playlistId: string,
  ) => Promise<void>;
  deletePlaylistMemberByMemberId: (
    conn: Connection,
    memberId: string,
  ) => Promise<void>;
  changePlaylistTitleByPlaylistId: (
    conn: Connection,
    playlistId: string,
    newTitle: string,
  ) => Promise<void>;
}
