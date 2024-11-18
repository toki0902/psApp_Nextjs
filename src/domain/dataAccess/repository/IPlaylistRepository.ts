export interface IPlaylistRepository {
  fetchPlaylistByUserId: () => Promise<void>;
  fetchPlaylistMemberIdByPlaylistId: () => Promise<string[]>;
}
