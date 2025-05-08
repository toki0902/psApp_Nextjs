type Thumbnails = {
  default: Thumbnail;
  medium?: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

//リソースが動画以外である場合があるため識別用オブジェクト
type ResourceId = {
  kind: string;
  videoId: string;
};
