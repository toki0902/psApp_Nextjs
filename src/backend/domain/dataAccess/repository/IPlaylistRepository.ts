import { Connection } from "mysql2/promise";
import { Playlist, PlaylistSummery } from "../../entities/Playlist";

export interface IPlaylistRepository {
  fetchPlaylistsByPlaylistIds: (
    conn: Connection,
    playlistId: string[],
  ) => Promise<
    [
      PlaylistSummery[],
      {
        playlistId: string;
        videos: { videoId: string; memberId: string }[];
      }[],
    ]
  >;
  fetchPlaylistsByUserId: (
    conn: Connection,
    userId: string,
  ) => Promise<
    [
      PlaylistSummery[],
      {
        playlistId: string;
        videos: { videoId: string; memberId: string }[];
      }[],
    ]
  >;
  fetchPlaylistByPlaylistTitleAndUserId: (
    conn: Connection,
    playlistTitle: string,
    userId: string,
  ) => Promise<
    [
      PlaylistSummery | undefined,
      (
        | {
            playlistId: string;
            videos: { videoId: string; memberId: string }[];
          }
        | undefined
      ),
    ]
  >;
  fetchPlaylistMembersByPlaylistIds: (
    conn: Connection,
    playlistIds: string[],
  ) => Promise<
    { playlistId: string; videos: { videoId: string; memberId: string }[] }[]
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
