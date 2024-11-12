export interface ISignInRepository {
  createSignInURL: (provider: string) => Promise<string>;
}
