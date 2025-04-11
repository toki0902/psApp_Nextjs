import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";

export class ChangePlaylistTitleByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (
    playlistId: string,
    userId: string,
    newTitle: string,
  ): Promise<void> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds([playlistId]);

    if (!playlistData?.length) {
      throw new NotFoundError("playlist is not found");
    }

    if (playlistData[0].ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    await this._playlistRepository.changePlaylistTitleByPlaylistId(
      playlistId,
      newTitle,
    );

    return;
  };
}
