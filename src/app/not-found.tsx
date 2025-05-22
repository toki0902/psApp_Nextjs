import Image from "next/image";
import Link from "next/link";
import React from "react";

const notfound = () => {
  return (
    <div className="h-full w-full">
      <div className="flex h-fit w-full flex-col items-center justify-center rounded-md border-4 border-red p-14 md:flex-row md:space-x-10">
        <div className="relative aspect-square h-40 w-40 lg:h-60 lg:w-60">
          <Image src="/images/loading-11.png" fill alt="notFound" />
        </div>
        <div className="flex flex-col items-start justify-center space-y-5">
          <h2 className="font-bold text-red lg:text-2xl">
            404 Not Found エラー
          </h2>
          <p className="">
            申し訳ありません。
            <br />
            あなたの検索したページは
            <br />
            存在しないか、アクセスする権限がありません。
            <br />
            <Link
              href="/api/auth/signin"
              className="font-bold text-red opacity-60 hover:opacity-100"
            >
              ログイン
            </Link>
            してからやり直すか、しばらく時間を空けてから再度お試しください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default notfound;
