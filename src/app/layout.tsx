import "@/src/frontend/assets/styles/global.css";
import Provider from "../frontend/components/Provider";
import ModalProvider from "../frontend/components/modal/ModalProvider";
import { auth } from "@/auth";
import Header from "../frontend/components/header/Header";
import { Session } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session = await auth();

  return (
    <html lang="ja">
      <body className="bg-back">
        <Provider session={session}>
          <ModalProvider>
            <Header session={session} />
            <main className="h-[calc(100vh-48px)] w-screen px-[3%] lg:h-[calc(100vh-80px)]">
              <div
                className="flex h-full w-full items-center justify-center overflow-auto bg-[url('/images/guitar.svg')] bg-fixed bg-no-repeat"
                style={{ backgroundSize: "70%", backgroundPosition: "50% 70%" }}
              >
                {children}
              </div>
            </main>
          </ModalProvider>
        </Provider>
      </body>
    </html>
  );
}
