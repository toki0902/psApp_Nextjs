import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";

export class DeletePlaylistByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (playlistId: string): Promise<void> => {
    await this._playlistRepository.deletePlaylistByPlaylistId(playlistId);

    return;
  };
}
