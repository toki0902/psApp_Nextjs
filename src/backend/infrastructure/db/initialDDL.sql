-- -- データベースの作成
-- DROP DATABASE IF EXISTS `ps-app`;
-- CREATE DATABASE `ps-app` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- -- データベースの使用
-- USE `ps-app`;

-- テーブル: users
CREATE TABLE IF NOT EXISTS users (
    user_id CHAR(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci PRIMARY KEY,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    social_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
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

-- テーブル: video_caches
CREATE TABLE IF NOT EXISTS video_caches (
    video_cache_id INT PRIMARY KEY AUTO_INCREMENT,
    expires DATE NOT NULL
);

-- テーブル: videos
CREATE TABLE IF NOT EXISTS videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    video_youtube_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    video_cache_id INT NOT NULL,
    views INT NOT NULL,
    thumbnail VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    title VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    FOREIGN KEY (video_cache_id) REFERENCES video_caches(video_cache_id) ON DELETE CASCADE
);

-- -- 任意: 初期データ
-- INSERT INTO users (user_id, name, social_id) VALUES
-- ('sqkt5svY5mWFt2i3u1S1g', 'toki', '118103284792160545208');

-- INSERT INTO playlists (playlist_id, owner_id, title) VALUES
-- ('sksjlgnskeisjti', 'sqkt5svY5mWFt2i3u1S1g', 'example'),
-- ('jngasdkviroisos', 'sqkt5svY5mWFt2i3u1S1g', 'example2'),
-- ('asdfjaksjdkfjhf', 'sqkt5svY5mWFt2i3u1S1g', 'example3');

-- INSERT INTO playlist_members (member_id, playlist_id, video_id) VALUES
-- ('skficnejlsjfidn', 'sksjlgnskeisjti', '1jlg7KrA7Es'),
-- ('djqognvkwjksotk', 'sksjlgnskeisjti', 'X5FHxeOSYns'),
-- ('akdiqognckslfks', 'jngasdkviroisos', 'LKHhdsChLx0'),
-- ('akdiqognckslfkg', 'jngasdkviroisos', 'JmEk9dM2VJU'),
-- ('kjairgonoawejfo', 'asdfjaksjdkfjhf', 'LKHhdsChLx0'),
-- ('kjairgonoawejfg', 'asdfjaksjdkfjhf', 'JmEk9dM2VJU');


-- -- 初期データの挿入（任意）
-- INSERT INTO users (user_id, name, social_id) VALUES
-- ('sqkt5svY5mWFt2i3u1S1g', 'toki', '118103284792160545208');

-- INSERT INTO playlists (playlist_id, owner_id, title) VALUES
-- ('sksjlgnskeisjti', 'sqkt5svY5mWFt2i3u1S1g', 'example'),
-- ('jngasdkviroisos', 'sqkt5svY5mWFt2i3u1S1g', 'example2'),
-- ('asdfjaksjdkfjhf', 'sqkt5svY5mWFt2i3u1S1g', 'example3');

-- INSERT INTO playlist_members (member_id, playlist_id, video_id) VALUES
-- ('skficnejlsjfidn', 'sksjlgnskeisjti', '1jlg7KrA7Es'),
-- ('djqognvkwjksotk', 'sksjlgnskeisjti', 'X5FHxeOSYns'),
-- ('akdiqognckslfks', 'jngasdkviroisos', 'LKHhdsChLx0'),
-- ('akdiqognckslfkg', 'jngasdkviroisos', 'JmEk9dM2VJU'),
-- ('kjairgonoawejfo', 'asdfjaksjdkfjhf', 'LKHhdsChLx0'),
-- ('kjairgonoawejfg', 'asdfjaksjdkfjhf', 'JmEk9dM2VJU');
