import "@/src/frontend/assets/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white">
        <div className="w-screen h-screen flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
