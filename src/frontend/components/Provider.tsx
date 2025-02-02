"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

//fix : 絶対anyじゃあかん
type props = { children: React.ReactNode; session: any };

const Provider = ({ children, session }: props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
