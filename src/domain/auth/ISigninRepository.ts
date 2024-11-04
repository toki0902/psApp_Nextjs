export interface ISigninRepository {
  signInAndCallback: (provider: string) => Promise<void>;
}
