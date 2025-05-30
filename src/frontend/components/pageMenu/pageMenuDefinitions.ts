import { useRouter } from "next/navigation";
import { ModalContextType } from "../../types/modal";
import { PageMenuData } from "../../types/pageMenu";

export const PageMenuDefinition = {
  edit: {
    getText: (pageMenuData: PageMenuData) =>
      `「${pageMenuData.edit?.title}」を編集`,
    icon: "/images/edit_823A42.svg",
    getOnClick: (
      pageMenuData: PageMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async (newTitle: string) => {
          if (pageMenuData.edit) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/id/${pageMenuData.edit.playlistId}`,
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

              router.push(`/playlists/${newTitle}`);
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
  create: {
    getText: () => "お気に入りを作成",
    icon: "/images/add_823A42.svg",
    getOnClick: (
      pageMenuData: PageMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async (playlistTitle: string) => {
          if (pageMenuData.create) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists`,
              {
                method: "POST",
                body: JSON.stringify({ playlistTitle: playlistTitle }),
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

        const playlistTitle = await openModal("createFavorite");

        if (playlistTitle) {
          await onPassCheck(playlistTitle);
        }
      };
    },
  },
  delete: {
    getText: (pageMenuData: PageMenuData) =>
      `「${pageMenuData.delete?.title}」を削除`,
    icon: "/images/delete_823A42.svg",
    getOnClick: (
      pageMenuData: PageMenuData,
      openModal: ModalContextType["openModal"],
      router: ReturnType<typeof useRouter>,
    ) => {
      return async () => {
        const onPassCheck = async () => {
          if (pageMenuData.delete) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/users/me/playlists/id/${pageMenuData.delete.playlistId}`,
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

              router.push(`/playlists`);
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
} as const;
