import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";

export class DeletePlaylistMemberByMemberId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (
    playlistId: string,
    userId: string,
    memberId: string
  ): Promise<void> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistId(playlistId);

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    if (playlistData.ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    await this._playlistRepository.deletePlaylistMemberByMemberId(memberId);

    return;
  };
}
