-- データベースの作成
DROP DATABASE IF EXISTS `ps-app`;
CREATE DATABASE `ps-app`;

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
