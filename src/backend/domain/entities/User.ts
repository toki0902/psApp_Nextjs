export class User {
  constructor(
    public userId: string,
    public name: string,
    public socialId: string,
    public image: string,
    public graduationYear: number | null,
  ) {}
}
