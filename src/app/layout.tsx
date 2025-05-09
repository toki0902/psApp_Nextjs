import "@/src/frontend/assets/styles/global.css";
import ModalProvider from "../frontend/components/modal/ModalProvider";
import { auth } from "@/src/backend/infrastructure/auth/auth";
import Header from "../frontend/components/header/Header";
import { Session } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await auth();

  return (
    <html lang="ja">
      <head>
        <title>P.S.民のためのアプリケーション</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="P.S.民に告ぐ。動画を検索したいと思ったことはないのか。「ただ限定公開だしなあ...」そう思ったことが多々あるだろう。そんなあなた達のためのサイト、爆誕"
        />
        <link rel="icon" type="image/png" href="/images/p.s.logo.png" />
      </head>
      <body className="bg-back">
        <ModalProvider>
          <Header session={session} />
          <main className="h-[calc(100vh-48px)] w-screen px-[3%] lg:h-[calc(100vh-80px)]">
            <div
              className="flex h-full w-full flex-col items-center justify-center overflow-auto bg-[url('/images/guitar.svg')] bg-fixed bg-no-repeat lg:flex-row"
              style={{ backgroundSize: "70%", backgroundPosition: "50% 70%" }}
            >
              {children}
            </div>
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
