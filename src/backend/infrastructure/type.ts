// playlistItems エンドポイントのレスポンス型
export type PlaylistItemsResponse = {
  kind: "youtube#playlistItemListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: PlaylistItem[];
};

export interface PageInfo {
  totalResults: number; // 検索結果の総数
  resultsPerPage: number; // 1ページあたりの結果数
}

export type PlaylistItem = {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: Snippet;
};

// 動画の基本情報（snippet）
export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

export type Thumbnails = {
  default: Thumbnail;
  medium?: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

//リソースが動画以外である場合があるため識別用オブジェクト
export type ResourceId = {
  kind: string;
  videoId: string;
};

export interface YoutubeVideoResponse {
  kind: string;
  etag: string;
  items: VideoDetails[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoDetails {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet?: Snippet;
  statistics?: VideoStatistics;
}

export interface VideoStatistics {
  viewCount: string; // 視聴回数
  likeCount: string; // 高評価数
  dislikeCount?: string; // 低評価数（非表示設定の場合もあるためオプショナル）
  favoriteCount: string; // お気に入り数（常に "0" で固定されている）
  commentCount?: string; // コメント数（コメントが無効な場合もあるためオプショナル）
}
