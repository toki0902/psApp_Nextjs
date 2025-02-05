import { auth } from "@/auth";
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
  const session = await auth();
  if (!session) {
    console.log("please login");
    redirect("/login");
  }

  if (session.user.userId !== userId) {
    console.log("diff userId");
    notFound();
  }
};
