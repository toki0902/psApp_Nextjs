-- データベースの作成
DROP DATABASE IF EXISTS `ps-app`;
CREATE DATABASE `ps-app` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- データベースの使用
USE `ps-app`;

-- users テーブルの作成
CREATE TABLE users (
    user_id CHAR(21) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    social_id VARCHAR(100) NOT NULL
);

-- playlists テーブルの作成
CREATE TABLE playlists (
    playlist_id CHAR(15) PRIMARY KEY,
    owner_id CHAR(21) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(100) NOT NULL,
    UNIQUE (title, owner_id),
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- playlist_members テーブルの作成
CREATE TABLE playlist_members (
    member_id CHAR(15) PRIMARY KEY,
    playlist_id CHAR(15) NOT NULL,
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
    video_youtube_id VARCHAR(100) NOT NULL,
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

INSERT INTO users (user_id, name, social_id) values ('sqkt5svY5mWFt2i3u1S1g', 'toki', '118103284792160545208');
INSERT INTO playlists (playlist_id, owner_id, title) values ('sksjlgnskeisjti', 'sqkt5svY5mWFt2i3u1S1g', 'example');
INSERT INTO playlist_members (playlist_id, video_id) values ('sksjlgnskeisjti', '1jlg7KrA7Es');
INSERT INTO playlist_members (playlist_id, video_id) values ('sksjlgnskeisjti', 'X5FHxeOSYns');
INSERT INTO playlists (playlist_id, owner_id, title) values ('jngasdkviroisos', 'sqkt5svY5mWFt2i3u1S1g', 'example2');
INSERT INTO playlist_members (playlist_id, video_id) values ('jngasdkviroisos', 'LKHhdsChLx0');
INSERT INTO playlist_members (playlist_id, video_id) values ('jngasdkviroisos', 'JmEk9dM2VJU');
INSERT INTO playlists (playlist_id, owner_id, title) values ('asdfjaksjdkfjhf', 'sqkt5svY5mWFt2i3u1S1g', 'example3');
INSERT INTO playlist_members (playlist_id, video_id) values ('asdfjaksjdkfjhf', 'LKHhdsChLx0');
INSERT INTO playlist_members (playlist_id, video_id) values ('asdfjaksjdkfjhf', 'JmEk9dM2VJU');