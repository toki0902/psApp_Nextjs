import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";

export class ChangePlaylistTitleByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (
    playlistId: string,
    userId: string,
    newTitle: string
  ): Promise<void> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistId(playlistId);

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    console.log(`this is playlistData: ${JSON.stringify(playlistData)}`);

    if (playlistData.ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    await this._playlistRepository.changePlaylistTitleByPlaylistId(
      playlistId,
      newTitle
    );

    return;
  };
}
