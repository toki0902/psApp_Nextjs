import "@/src/frontend/assets/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white">{children}</body>
    </html>
  );
}
