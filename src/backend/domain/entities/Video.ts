export class Video {
  constructor(
    public videoId: string,
    public views: number,
    public thumbnail: string,
    public title: string,
    public publishedAt: Date,
  ) {}

  public get url(): string {
    return `https://www.youtube.com/watch?v=${this.videoId}`;
  }
}
