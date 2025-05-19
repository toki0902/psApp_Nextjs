-- -- データベースの作成
-- DROP DATABASE IF EXISTS `ps-app`;
-- CREATE DATABASE `ps-app` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- -- データベースの使用
-- USE `ps-app`;

-- テーブル: users
CREATE TABLE IF NOT EXISTS users (
    user_id CHAR(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci PRIMARY KEY,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    social_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    graduation_year INT,
);

-- テーブル: playlists
CREATE TABLE IF NOT EXISTS playlists (
    playlist_id CHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci PRIMARY KEY,
    owner_id CHAR(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    UNIQUE (title, owner_id),
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- テーブル: playlist_members
CREATE TABLE IF NOT EXISTS playlist_members (
    member_id CHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci PRIMARY KEY,
    playlist_id CHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    video_id CHAR(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id) ON DELETE CASCADE
);

-- テーブル: videos
CREATE TABLE IF NOT EXISTS videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    video_youtube_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    views INT NOT NULL,
    thumbnail VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    title VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    published_at DATETIME NOT NULL,
);

