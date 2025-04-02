import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";

export class ChangePlaylistTitleByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (playlistId: string, newTitle: string): Promise<void> => {
    await this._playlistRepository.changePlaylistTitleByPlaylistId(
      playlistId,
      newTitle
    );

    return;
  };
}
