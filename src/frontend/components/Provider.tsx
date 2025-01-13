"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type childrenProps = {
  children: ReactNode;
};

const Provider = ({ children }: childrenProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
