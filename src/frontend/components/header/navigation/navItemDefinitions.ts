export const navItemDefinitions = {
  home: {
    text: "ホーム",
    getHref: () => "/",
    hoverIcon: "/images/home_823A42.svg",
    defaultIcon: "/images/home_2c4a52.svg",
  },
  favorite: {
    text: "お気に入り",
    getHref: (userId: string) => `/users/${userId}/playlists`,
    hoverIcon: "/images/favorite_823A42.svg",
    defaultIcon: "/images/favorite_2c4a52.svg",
  },
  login: {
    text: "ログイン",
    getHref: () => "/v1/api/auth/signin",
    hoverIcon: "/images/login_823A42.svg",
    defaultIcon: "/images/login_2c4a52.svg",
  },
};
