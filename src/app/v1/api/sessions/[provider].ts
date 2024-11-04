import type { NextApiRequest, NextApiResponse } from "next";
import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRespository";
import { SignInService } from "@/src/application/auth/SignInService";

const signinRepository = new NextAuthSignInRepository();
const signInService = new SignInService(signinRepository);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const provider = Array.isArray(req.query.provider)
      ? req.query.provider[0]
      : req.query.provider;
    if (!provider) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    await signInService.redirectAuthProvider(provider);
  }
};

export default handler;
