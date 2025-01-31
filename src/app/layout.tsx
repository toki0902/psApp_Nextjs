import "@/src/frontend/assets/styles/global.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-back">
        <div
          className="w-screen h-screen flex justify-center items-center bg-[url('/images/guitar.svg')] bg-no-repeat"
          style={{ backgroundSize: "70%", backgroundPosition: "50% 70%" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
