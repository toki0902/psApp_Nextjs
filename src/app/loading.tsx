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
// import loading8_rock from "public/images/loading-8-rock.png";
// import loading8_scissor from "public/images/loading-8-scissor.png";
// import loading8_paper from "public/images/loading-8-paper.png";
import loading9 from "public/images/loading-9.png";
import loading10 from "public/images/loading-10.png";
import loading11 from "public/images/loading-11.png";
import loading12 from "public/images/loading-12.png";

const Loading = async () => {
  const images = [
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading10,
    loading11,
    loading12,
  ];
  const num = Math.floor(Math.random() * images.length);

  const randomImage = images[num];

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
          : randomImage === loading9 ||
              randomImage === loading10 ||
              randomImage === loading11 ||
              randomImage === loading12
            ? "星 初夏紀"
            : "宮脇 虎太郎";

  return (
    <div className="fixed right-0 top-0 z-30 flex h-dvh w-dvw animate-focus-in items-center justify-center bg-back">
      <div className="animate-slowSpin">
        {randomImage && (
          <div className="h-32 w-32 lg:h-48 lg:w-48">
            <img
              src={randomImage.src}
              className="h-full w-full"
              alt="Official LOGO"
            ></img>
          </div>
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
