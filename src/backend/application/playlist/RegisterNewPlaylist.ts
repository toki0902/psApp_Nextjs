import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylist {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (title: string, ownerId: string) => {
    await this._playlistRepository.insertPlaylist(title, ownerId);
    return;
  };
}
