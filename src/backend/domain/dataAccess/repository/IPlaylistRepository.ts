import { DeletePlaylistByPlaylistId } from "@/src/backend/application/playlist/DeletePlaylistByPlaylistId";

export interface IPlaylistRepository {
  fetchPlaylistByPlaylistId: (playlistId: string) => Promise<
    | {
        playlistId: string;
        createdAt: string;
        title: string;
        ownerId: string;
      }
    | undefined
  >;
  fetchPlaylistByUserId: (userId: string) => Promise<
    {
      playlistId: string;
      createdAt: string;
      title: string;
      ownerId: string;
    }[]
  >;
  fetchPlaylistMemberIdsByPlaylistId: (
    playlistId: string
  ) => Promise<{ videoId: string; memberId: number }[]>;
  fetchPlaylistByPlaylistTitleAndUserId: (
    playlistTitle: string,
    userId: string
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
  insertPlaylistMember: (videoId: string, playlistId: string) => Promise<void>;
  deletePlaylistByPlaylistId: (playlistId: string) => Promise<void>;
  deletePlaylistMemberByMemberId: (memberId: string) => Promise<void>;
  changePlaylistTitleByPlaylistId: (
    playlistId: string,
    newTitle: string
  ) => Promise<void>;
}
