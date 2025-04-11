import "@/src/frontend/assets/styles/global.css";
import Provider from "../frontend/components/Provider";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="ja">
      <body className="bg-back">
        <Provider session={session}>
          <div
            className="flex h-full w-full items-center justify-center overflow-auto bg-[url('/images/guitar.svg')] bg-fixed bg-no-repeat"
            style={{ backgroundSize: "70%", backgroundPosition: "50% 70%" }}
          >
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
