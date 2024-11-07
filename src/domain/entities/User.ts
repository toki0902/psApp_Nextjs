export class User {
  constructor(
    private _userId: string,
    private _name: string,
    private _socialId: string,
    private _image: string
  ) {}

  get userId() {
    return this._userId;
  }

  get name() {
    return this._name;
  }

  get socialId() {
    return this._socialId;
  }

  get image() {
    return this._image;
  }
}
