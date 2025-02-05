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
            className="w-full h-full overflow-auto flex justify-center items-center bg-[url('/images/guitar.svg')] bg-no-repeat bg-fixed"
            style={{ backgroundSize: "70%", backgroundPosition: "50% 70%" }}
          >
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
