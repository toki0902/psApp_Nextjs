export class Video {
  constructor(
    public url: string,
    public uploadAt: string,
    public views: number,
    public thumbnail: string,
    public title: string
  ) {}
}
