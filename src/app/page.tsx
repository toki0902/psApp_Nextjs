import "@/src/frontend/assets/styles/global.css";

import Button from "@/components/Button";

import { Noto_Serif_bold } from "@/fonts";
import { Caveat_thin } from "@/fonts";
import { Baloo_thin } from "@/fonts";

import coffeeLogo from "public/images/coffee.svg";
import { auth } from "@/src/backend/interface/auth/auth";
import { Session } from "next-auth";

const App = async () => {
  const session: Session | null = await auth();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
      <div className="flex w-1/3 flex-col items-center justify-center border-red">
        <div className="flex w-full items-center justify-center">
          <div className="mr-10 hidden h-full items-center justify-center lg:flex">
            <img
              src={coffeeLogo.src}
              alt="coffee~"
              className="w-24 lg:w-28"
            ></img>
          </div>
          <div
            className={`${Noto_Serif_bold.className} flex h-full items-center justify-center text-center text-3xl lg:text-4xl 2xl:text-5xl`}
          >
            P.S. <br />
            MEMORIES
          </div>
        </div>
        <div
          className={`${Baloo_thin.className} text-1xl mb-10 mt-10 flex flex-col items-center justify-center text-center tracking-[.3em] text-blue lg:mb-0 lg:text-2xl`}
        >
          DOSHISHA ACOUSTIC <br />
          MUSIC CIRCLE
        </div>
      </div>
      <div
        className={`${Caveat_thin.className} flex w-1/3 flex-col items-center justify-center space-y-5 border-red lg:space-y-10`}
      >
        {session ? (
          <Button href={`/playlists`}>FAVORITE</Button>
        ) : (
          <>
            <Button inVisible>FAVORITE</Button>
            <Button href="login">LOGIN</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
