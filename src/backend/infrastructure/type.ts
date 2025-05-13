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

export interface PlaylistItem {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string; // ISO datetime
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string; // usually "youtube#video"
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt?: string;
    endAt?: string;
    note?: string;
    videoPublishedAt: string; // ISO datetime
  };
  status?: {
    privacyStatus: "public" | "private" | "unlisted";
  };
}

export interface YoutubeVideoResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: YoutubeVideo[];
}

export interface YoutubeVideo {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: string[];
      blocked?: string[];
    };
    contentRating?: {
      [key: string]: string | string[];
    };
    projection: string;
    hasCustomThumbnail: boolean;
  };
  status?: {
    uploadStatus: string;
    failureReason?: string;
    rejectionReason?: string;
    privacyStatus: "public" | "private" | "unlisted";
    publishAt?: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
    selfDeclaredMadeForKids?: boolean;
    containsSyntheticMedia?: boolean;
  };
  statistics?: {
    viewCount: string;
    likeCount?: string;
    dislikeCount?: string;
    favoriteCount: string;
    commentCount?: string;
  };
  paidProductPlacementDetails?: {
    hasPaidProductPlacement: boolean;
  };
  player?: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  topicDetails?: {
    topicIds?: string[];
    relevantTopicIds?: string[];
    topicCategories?: string[];
  };
  recordingDetails?: {
    recordingDate: string;
  };
  fileDetails?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    container: string;
    videoStreams: {
      widthPixels: number;
      heightPixels: number;
      frameRateFps: number;
      aspectRatio: number;
      codec: string;
      bitrateBps: number;
      rotation: string;
      vendor: string;
    }[];
    audioStreams: {
      channelCount: number;
      codec: string;
      bitrateBps: number;
      vendor: string;
    }[];
    durationMs: number;
    bitrateBps: number;
    creationTime: string;
  };
  processingDetails?: {
    processingStatus: string;
    processingProgress?: {
      partsTotal: number;
      partsProcessed: number;
      timeLeftMs: number;
    };
    processingFailureReason?: string;
    fileDetailsAvailability?: string;
    processingIssuesAvailability?: string;
    tagSuggestionsAvailability?: string;
    editorSuggestionsAvailability?: string;
    thumbnailsAvailability?: string;
  };
  suggestions?: {
    processingErrors?: string[];
    processingWarnings?: string[];
    processingHints?: string[];
    tagSuggestions?: {
      tag: string;
      categoryRestricts?: string[];
    }[];
    editorSuggestions?: string[];
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
    scheduledEndTime?: string;
    concurrentViewers?: number;
    activeLiveChatId?: string;
  };
  localizations?: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}
