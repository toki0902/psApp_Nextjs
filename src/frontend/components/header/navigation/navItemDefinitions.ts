export const navItemDefinitions = {
  home: {
    text: "ホーム",
    href: "/",
    hoverIcon: "/images/home_823A42.svg",
    defaultIcon: "/images/home_2c4a52.svg",
  },
  favorite: {
    text: "お気に入り",
    href: "/users/[userId]/playlists",
    hoverIcon: "/images/favorite_823A42.svg",
    defaultIcon: "/images/favorite_2c4a52.svg",
  },
  login: {
    text: "ログイン",
    href: "/v1/api/auth/signin",
    hoverIcon: "/images/login_823A42.svg",
    defaultIcon: "/images/login_2c4a52.svg",
  },
};
