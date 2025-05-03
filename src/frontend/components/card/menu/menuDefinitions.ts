import { CardMenuData } from "@/src/frontend/types/cardMenu";
import { ModalContextType } from "@/src/frontend/types/modal";
import { NextRouter, useRouter } from "next/router";

//getOnClickはそれぞれの通過後の処理を記述する

export const menuDefinitions = {
  edit: {
    icon: "/images/edit_823A42.svg",
    hoverIcon: "/images/edit_f1EBE5.svg",
    getLabel: (data: CardMenuData) => "編集する",
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: NextRouter,
    ) => {
      return async () => {
        const onPassCheck = async (newTitle: string) => {
          if (data.edit) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${data.edit.ownerId}/playlists/id/${data.edit.playlistId}`,
              {
                method: "PATCH",
                body: JSON.stringify({ newTitle }),
                headers: { "Content-Type": "application/json" },
              },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
            } else {
              console.log("プレイリストタイトルを更新しました。");
              router.push(`/users/${data.edit.ownerId}/playlists/${newTitle}`);
            }
          }
        };

        const newTitle = await openModal("edit");
        if (newTitle) {
          await onPassCheck(newTitle);
        }
      };
    },
  },
  deletePlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: CardMenuData) => `${data.deletePlaylist?.title}を削除する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: NextRouter,
    ) => {
      return async () => {
        const onPassCheck = async () => {
          if (data.deletePlaylist) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${data.deletePlaylist.ownerId}/playlists/id/${data.deletePlaylist.playlistId}`,
              { method: "DELETE" },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
            } else {
              console.log("プレイリストを削除しました。");
              router.reload();
            }
          }
        };

        const result = await openModal("deletePlaylist");

        if (result) {
          await onPassCheck();
        }
      };
    },
  },
  addFavorite: {
    icon: "/images/favorite_823A42.svg",
    hoverIcon: "/images/favorite_f1EBE5.svg",
    getLabel: (data: CardMenuData) => `お気に入りに追加する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: NextRouter,
    ) => {
      return async () => {
        const onPassCheck = async (addPlaylistIds: string[]) => {
          if (data.addFavorite) {
            const bodyObj = {
              videoId: data.addFavorite.thisVideoInfo.videoId,
              playlistIds: addPlaylistIds,
            };
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${data.addFavorite.userPlaylistsInfo[0].ownerId}/playlists/videos`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyObj),
              },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
            } else {
              const resData = await res.json();
              console.log(resData.message);
              router.reload();
            }
          }
        };

        if (data.addFavorite) {
          const addPlaylistIds = await openModal("addFavorite", {
            playlists: data.addFavorite.userPlaylistsInfo,
          });

          if (addPlaylistIds) {
            await onPassCheck(addPlaylistIds);
          }
        }
      };
    },
  },

  share: {
    icon: "/images/share_823A42.svg",
    hoverIcon: "/images/share_f1EBE5.svg",
    getLabel: () => `共有する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
    ) => {
      return async () => {};
    },
  },

  deleteFromPlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: CardMenuData) => `お気に入りから削除する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: NextRouter,
    ) => {
      return async () => {
        const onPassCheck = async () => {
          if (data.deleteFromPlaylist) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/${data.deleteFromPlaylist.ownerPlaylistInfo.ownerId}/playlists/id/${data.deleteFromPlaylist.ownerPlaylistInfo.playlistId}/videos/${data.deleteFromPlaylist.memberId}`,
              { method: "DELETE" },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
            } else {
              console.log("プレイリストから動画を削除しました。");
              router.reload();
            }
          }
        };

        const result = await openModal("deleteFromPlaylist");

        if (result) {
          await onPassCheck();
        }
      };
    },
  },
};
