import "@/src/frontend/assets/styles/global.css";
import Image from "next/image";

import Button from "@/components/Button";

import { Noto_Serif_bold } from "@/fonts";
import { Caveat_thin } from "@/fonts";
import { Baloo_thin } from "@/fonts";

import coffeeLogo from "public/images/coffee.svg";
import { auth } from "@/src/backend/infrastructure/auth/auth";
import { Session } from "next-auth";

const App = async () => {
  const session: Session = await auth();

  return (
    <>
      <div className="flex w-1/3 flex-col items-center justify-center border-red">
        <div className="flex w-full items-center justify-center">
          <div className="mr-10 hidden h-full items-center justify-center lg:flex">
            <Image
              src={coffeeLogo}
              alt="coffee~"
              className="w-24 lg:w-28"
            ></Image>
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
          <Button href={`/users/${session.user.userId}/playlists`}>
            FAVORITE
          </Button>
        ) : (
          <Button inVisible>FAVORITE</Button>
        )}
        <Button href="/v1/api/auth/signin">LOGIN</Button>
      </div>
    </>
  );
};

export default App;
