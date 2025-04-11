import { MenuDataMap } from "@/src/frontend/types/cardMenu";
import { ModalType } from "@/src/frontend/types/modal";

export const menuDefinitions = {
  edit: {
    icon: "/images/edit_823A42.svg",
    hoverIcon: "/images/edit_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => "編集する",
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, modalType: ModalType) => void,
    ) => {
      if (data.edit) {
        const playlistId = data.edit.playlistId;
        return () => openModal(playlistId, "edit");
      } else return () => {};
    },
  },
  deletePlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => `${data.deletePlaylist?.title}を削除する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, modalType: ModalType) => void,
    ) => {
      if (data.deletePlaylist) {
        const playlistId = data.deletePlaylist.playlistId;
        return () => openModal(playlistId, "deletePlaylist");
      } else return () => {};
    },
  },
  addToPlaylist: {
    icon: "/images/favorite_823A42.svg",
    hoverIcon: "/images/favorite_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => `お気に入りに追加する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, modalType: ModalType) => void,
    ) => {
      if (data.addToPlaylist) {
        const videoId = data.addToPlaylist.videoId;
        return () => openModal(videoId, "addToPlaylist");
      } else return () => {};
    },
  },
  share: {
    icon: "/images/share_823A42.svg",
    hoverIcon: "/images/share_f1EBE5.svg",
    getLabel: () => `共有する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, modalType: ModalType) => void,
    ) => {
      if (data.share) {
        const videoId = data.share.videoId;
        return () => openModal(videoId, "share");
      } else return () => {};
    },
  },
  deleteFromPlaylist: {
    icon: "/images/delete_823A42.svg",
    hoverIcon: "/images/delete_f1EBE5.svg",
    getLabel: (data: MenuDataMap) => `お気に入りから削除する`,
    getOnClick: (
      data: MenuDataMap,
      openModal: (id: string, modalType: ModalType) => void,
    ) => {
      if (data.deleteFromPlaylist) {
        const videoId = data.deleteFromPlaylist.videoId;
        return () => openModal(videoId, "deleteFromPlaylist");
      } else return () => {};
    },
  },
} as const;
