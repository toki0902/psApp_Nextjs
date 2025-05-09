import { auth } from "@/src/backend/infrastructure/auth/auth";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

//サーバサイドコンポーネントでapiリクエストする時に、クッキーを取り出してリクエストに付与する用
export const getAllCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  return cookie;
};

export const checkSession = async (userId: string): Promise<void> => {
  "use server";
  const session: Session | null = await auth();
  if (!session) {
    console.log("no session");
    redirect("/login");
  }

  if (session.user.userId !== userId) {
    console.log("diff userId");
    console.log(userId, session.user.userId);
    notFound();
  }
};
