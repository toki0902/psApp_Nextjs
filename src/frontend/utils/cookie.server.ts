"use server";
import { cookies } from "next/headers";

//サーバサイドコンポーネントでapiリクエストする時に、クッキーを取り出してリクエストに付与する用
export const getAllCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  return cookie;
};

export const isVerifiedPassPhrase = async () => {
  const cookie = await getAllCookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/auth/verify-passphrase`,
    {
      method: "GET",
      credentials: "include",
      headers: { Cookie: cookie },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    return false;
  } else {
    const data = await res.json();

    return data.success;
  }
};
