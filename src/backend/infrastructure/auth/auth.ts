import { nextAuthOptions } from "./config";
import NextAuth from "../../../../node_modules/next-auth";

export const { handlers, auth } = NextAuth(nextAuthOptions);
