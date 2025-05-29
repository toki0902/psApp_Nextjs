export const headerMenuDefinitions = {
  logout: {
    text: "ログアウトする",
    icon: "/images/logout_2c4a52.svg",
    getHref: () => "/api/auth/signout",
  },
  login: {
    text: "ログインする",
    icon: "/images/login_2c4a52.svg",
    getHref: () => "/login",
  },
  setting: {
    text: "設定",
    icon: "/images/setting_2c4a52.svg",
    getHref: () => `/settings/profile`,
  },
  mobileSetting: {
    text: "設定",
    icon: "/images/setting_f1EBE5.svg",
    getHref: () => "/settings/profile",
  },
  mobileLogout: {
    text: "ログアウトする",
    icon: "/images/logout_f1EBE5.svg",
    getHref: () => "/api/auth/signout",
  },
  mobileFavorite: {
    text: "お気に入りを閲覧する",
    icon: "/images/favorite_f1EBE5.svg",
    getHref: () => `/playlists`,
  },
  mobileLogin: {
    text: "ログインする",
    icon: "/images/login_f1EBE5.svg",
    getHref: () => "/login",
  },
  mobileHome: {
    text: "ホームに戻る",
    icon: "/images/home_f1EBE5.svg",
    getHref: () => "/",
  },
};
