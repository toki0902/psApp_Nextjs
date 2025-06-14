import "@/src/frontend/assets/styles/global.css";
import ModalProvider from "../frontend/components/modal/ModalProvider";
import { auth } from "@/src/backend/interface/auth/auth";
import Header from "../frontend/components/header/Header";
import { Session } from "next-auth";
import Script from "next/script";

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
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0"
        />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="P.S.民に告ぐ。動画を検索したいと思ったことはないのか。「ただ限定公開だしなあ...」そう思ったことが多々あるだろう。そんなあなた達のためのサイト、爆誕"
        />
        <link rel="icon" type="image/png" href="/images/p.s.logo.png" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className="relative bg-back">
        <ModalProvider>
          <Header session={session} />
          <main className="absolute top-[70px] h-[calc(100dvh-70px)] w-full px-[3%] lg:top-[96px] lg:h-[calc(100dvh-96px)]">
            <div
              className="h-full w-full overflow-auto bg-[url('/images/guitar.svg')] bg-scroll bg-no-repeat"
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
