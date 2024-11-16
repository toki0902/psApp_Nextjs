-- データベースの作成
DROP DATABASE IF EXISTS `ps-app`;
CREATE DATABASE `ps-app` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- データベースの使用
USE `ps-app`;

-- users テーブルの作成
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    social_id VARCHAR(100) NOT NULL
);

-- playlists テーブルの作成
CREATE TABLE playlists (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- playlist_members テーブルの作成
CREATE TABLE playlist_members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_id INT NOT NULL,
    video_id CHAR(11) NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id) ON DELETE CASCADE
);

-- video_caches テーブルの作成
CREATE TABLE video_caches (
    video_cache_id INT PRIMARY KEY AUTO_INCREMENT,
    expires DATE NOT NULL
);

-- videos テーブルの作成
CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(100) NOT NULL,
    video_cache_id INT NOT NULL,
    views INT NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    FOREIGN KEY (video_cache_id) REFERENCES video_caches(video_cache_id) ON DELETE CASCADE
);

-- 文字セットの統一
ALTER DATABASE `ps-app` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER TABLE playlists CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER TABLE playlist_members CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER TABLE video_caches CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER TABLE videos CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
