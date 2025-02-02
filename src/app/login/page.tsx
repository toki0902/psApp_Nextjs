"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { data } = useSession();
  useEffect(() => {
    setSession(data);
  }, []);

  console.log(session);
  return;
};

export default Login;
