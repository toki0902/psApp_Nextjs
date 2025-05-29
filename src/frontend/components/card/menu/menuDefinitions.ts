import { CardMenuData } from "@/src/frontend/types/cardMenu";
import { ModalContextType } from "@/src/frontend/types/modal";
import { isMobile } from "@/src/frontend/utils/device.client";
import { useRouter } from "next/navigation";
//getOnClickはそれぞれの通過後の処理を記述する

export const menuDefinitions = {
  edit: {
    icon: "/images/edit_823A42.svg",
    hoverIcon: "/images/edit_f1EBE5.svg",
    getLabel: () => "編集する",
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async (newTitle: string) => {
          if (data.edit) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/id/${data.edit.playlistId}`,
              {
                method: "PATCH",
                body: JSON.stringify({ newTitle }),
                headers: { "Content-Type": "application/json" },
              },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
              openModal("notice", {
                message: errorData.message,
                type: "error",
              });
            } else {
              const resData = await res.json();

              //noticeModalなのでawaitしないでも良い
              openModal("notice", {
                message: resData.message,
                type: "normal",
              });
              router.refresh();
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
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async () => {
          if (data.deletePlaylist) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/id/${data.deletePlaylist.playlistId}`,
              { method: "DELETE" },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
              openModal("notice", {
                message: errorData.message,
                type: "error",
              });
            } else {
              const resData = await res.json();
              //noticeModalなのでawaitしないでも良い
              openModal("notice", {
                message: resData.message,
                type: "normal",
              });

              router.refresh();
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
    getLabel: () => `お気に入りに追加する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async (addPlaylistIds: string[]) => {
          if (data.addFavorite) {
            const bodyObj = {
              videoId: data.addFavorite.thisVideoInfo.videoId,
              playlistIds: addPlaylistIds,
            };
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/videos`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyObj),
              },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
              openModal("notice", {
                message: errorData.message,
                type: "error",
              });
            } else {
              const resData = await res.json();
              //noticeModalなのでawaitしないでも良い
              openModal("notice", {
                message: resData.message,
                type: "normal",
              });

              router.refresh();
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
      return async () => {
        if (data.share) {
          const shareData = {
            title: data.share.title,
            text: "おすすめの動画が届きました。ぜひみんなで見返してね。",
            url: data.share.url,
          };
          if (isMobile()) {
            await navigator.share(shareData);
          } else {
            navigator.clipboard.writeText(data.share.url);
            openModal("notice", {
              message: "動画のURLをコピーしました。",
              type: "normal",
            });
          }
        }
      };
    },
  },

  deleteFromPlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: CardMenuData) =>
      `「${data.deleteFromPlaylist?.ownerPlaylistInfo.title || "お気に入り"}」から削除する`,
    getOnClick: (
      data: CardMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async () => {
          if (data.deleteFromPlaylist) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/id/${data.deleteFromPlaylist.ownerPlaylistInfo.playlistId}/videos/${data.deleteFromPlaylist.memberId}`,
              { method: "DELETE" },
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.log(`${errorData.errorType!}: ${errorData.message}`);
              openModal("notice", {
                message: errorData.message,
                type: "error",
              });
            } else {
              const resData = await res.json();
              //noticeModalなのでawaitしないでも良い
              openModal("notice", {
                message: resData.message,
                type: "normal",
              });

              router.refresh();
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
