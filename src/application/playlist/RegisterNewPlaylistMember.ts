import { NotFoundError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "@/src/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylistMember {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (playlistTitle: string, userId: string, videoId: string) => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
        playlistTitle,
        userId
      );

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    await this._playlistRepository.insertPlaylistMember(
      videoId,
      playlistData?.playlistId
    );
    return;
  };
}
