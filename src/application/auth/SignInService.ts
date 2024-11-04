import { ISigninRepository } from "@/src/domain/auth/ISigninRepository";

//実装すべきなのはproviderへのリダイレクト、callback内での処理。
export class SignInService {
  constructor(private _signInRepository: ISigninRepository) {}
  redirectAuthProvider = async (provider: string) => {
    await this._signInRepository.signInAndCallback(provider);
  };
}
