export const headerMenuDefinitions = {
  logout: {
    text: "ログアウトする",
    icon: "/images/logout_2c4a52.svg",
    getHref: () => "/v1/api/auth/signout",
  },
  login: {
    text: "ログインする",
    icon: "/images/login_2c4a52.svg",
    getHref: () => "/v1/api/auth/signin",
  },
  setting: {
    text: "ユーザ設定",
    icon: "/images/setting_2c4a52.svg",
    getHref: (userId: string) => `/users/${userId}/setting`,
  },

  mobileLogout: {
    text: "ログアウトする",
    icon: "/images/logout_f1EBE5.svg",
    getHref: () => "/v1/api/auth/signout",
  },
  mobileFavorite: {
    text: "お気に入りを閲覧する",
    icon: "/images/favorite_f1EBE5.svg",
    getHref: (userId: string) => `/users/${userId}/playlists`,
  },
  mobileLogin: {
    text: "ログインする",
    icon: "/images/login_f1EBE5.svg",
    getHref: () => "/v1/api/auth/signin",
  },
  mobileHome: {
    text: "ホームに戻る",
    icon: "/images/home_f1EBE5.svg",
    getHref: () => "/",
  },
};
