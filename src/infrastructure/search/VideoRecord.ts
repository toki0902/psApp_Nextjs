export class VideoRecord {
  constructor(
    private _url: string,
    private _uploadAt: string,
    private _views: number,
    private _thumbnail: string,
    private _title: string
  ) {}

  get url() {
    return this._url;
  }
  get uploadAt() {
    return this._uploadAt;
  }
  get views() {
    return this._views;
  }
  get thumbnail() {
    return this._thumbnail;
  }
  get title() {
    return this._title;
  }
}
