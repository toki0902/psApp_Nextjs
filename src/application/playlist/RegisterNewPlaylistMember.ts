import { IPlaylistRepository } from "@/src/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylistMember {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (playlistTitle: string, userId: string, videoId: string) => {
    const playlistId =
      await this._playlistRepository.fetchPlaylistIdByPlaylistTitleAndUserId(
        playlistTitle,
        userId
      );

    await this._playlistRepository.insertPlaylistMember(videoId, playlistId);
    return;
  };
}
