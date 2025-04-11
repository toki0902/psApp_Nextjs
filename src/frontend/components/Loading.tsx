"use client";
import Image from "next/image";
import { Caveat_thin } from "@/fonts";

import psLogo from "public/images/p.s.logo.png";
import loading1 from "public/images/loading-1.png";
import loading2 from "public/images/loading-2.png";
import loading3 from "public/images/loading-3.png";
import loading4 from "public/images/loading-4.png";
import loading5 from "public/images/loading-5.png";
import loading6 from "public/images/loading-6.png";
import loading7 from "public/images/loading-7.png";
import loading8 from "public/images/loading-8.png";
import loading8_rock from "public/images/loading-8-rock.png";
import loading8_scissor from "public/images/loading-8-scissor.png";
import loading8_paper from "public/images/loading-8-paper.png";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const STATUS = {
  visible: "visible",
  hiding: "hiding",
  hidden: "hidden",
} as const;

type LoadingStatus = (typeof STATUS)[keyof typeof STATUS];

type Props = {
  hideLoading: () => void;
  status: LoadingStatus;
};

const Loading = ({ status, hideLoading }: Props) => {
  const [randomImage, setRandomImage] = useState<StaticImport | null>();

  useEffect(() => {
    const images = [
      psLogo,
      loading1,
      loading2,
      loading3,
      loading4,
      loading5,
      loading6,
      loading7,
      loading8,
    ];
    const num = Math.floor(Math.random() * images.length);
    setRandomImage(images[num]);
  }, []);

  const writer =
    randomImage === loading2 ||
    randomImage === loading3 ||
    randomImage === loading4
      ? "酉川 莉子"
      : randomImage === psLogo
        ? "P.S.公式"
        : randomImage === loading5 ||
            randomImage === loading6 ||
            randomImage === loading7 ||
            randomImage === loading8
          ? "神田 陽那"
          : "宮脇 虎太郎";

  const width = randomImage === loading6 ? 280 : 200;

  return (
    <div
      onAnimationEnd={hideLoading}
      className={
        status === "visible"
          ? "fixed right-0 top-0 z-30 flex h-screen w-screen animate-focus-in items-center justify-center bg-back"
          : status === "hiding"
            ? "fixed right-0 top-0 z-30 flex h-screen w-screen animate-blur-out items-center justify-center bg-back"
            : "hidden"
      }
    >
      <div className="animate-slowSpin">
        {randomImage && (
          <Image src={randomImage} alt="Official LOGO" width={width}></Image>
        )}
      </div>
      <p
        className={`${Caveat_thin.className} absolute left-1/2 top-[66%] flex -translate-x-1/2 text-5xl text-red`}
      >
        Loading
        <span className="ml-2">
          <span className="animate-dot-first">.</span>
          <span className="animate-dot-second">.</span>
          <span className="animate-dot-third">.</span>
        </span>
      </p>
      <p className="absolute bottom-7 right-7 text-xl text-blue">
        ロゴ提供：{writer}
      </p>
    </div>
  );
};

export default Loading;
