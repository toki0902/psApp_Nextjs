import React from "react";
import { Noto_Serif_bold } from "@/src/frontend/assets/fonts/fonts";
import Image from "next/image";
import { auth } from "@/src/backend/interface/auth/auth";
import { notFound } from "next/navigation";
import SettingMenu from "@/src/frontend/components/settingMenu/SettingMenu";
import UpdateProfileButton from "@/src/frontend/components/settingMenu/UpdateProfileButton";

const page = async () => {
  const session = await auth();
  if (!session) notFound();

  return (
    <div className="flex h-full w-full flex-col py-3">
      <h2
        className={`${Noto_Serif_bold.className} text-base font-bold lg:text-[24px]`}
      >
        設定
      </h2>
      <div className="mt-2 flex h-full w-full flex-col lg:flex-row">
        <SettingMenu />
        <div className="flex h-full w-full flex-col space-y-3 pt-2 text-sm lg:ml-10 lg:space-y-5 lg:text-base">
          <h2 className="text-sm font-bold lg:text-[24px]">プロフィール</h2>
          <div className="flex w-full flex-col px-2 lg:flex-row lg:px-0">
            <div className="flex h-fit items-center lg:mr-16 lg:w-48 lg:flex-col lg:items-start">
              <h3>プロバイダー情報</h3>
            </div>
            <ul className="mt-4 flex w-full flex-col space-y-4 lg:mt-0 lg:w-80 lg:space-y-8">
              <li className="flex w-full items-center justify-between px-4 lg:px-0">
                <p>プロバイダー:</p>
                <p className="font-bold">{session.provider.provider}</p>
              </li>
              <li className="flex w-full items-center justify-between px-4 lg:px-0">
                <p>プロバイダーので名前:</p>
                <p className="font-bold">{session.provider.displayName}</p>
              </li>
              <li className="flex w-full items-center justify-between px-4 lg:px-0">
                <p>プロバイダー内のアイコン:</p>
                <div className="relative aspect-square w-10 overflow-hidden rounded-full lg:w-14">
                  <Image src={session.provider.image} alt="userIcon" fill />
                </div>
              </li>
            </ul>
          </div>
          <hr className="h-[1px] border-none bg-red" />
          <div className="flex w-full flex-col px-2 lg:flex-row lg:px-0">
            <div className="flex h-fit items-center lg:mr-16 lg:w-48 lg:flex-col lg:items-start">
              <h3>ps-application情報</h3>
              <UpdateProfileButton />
            </div>
            <ul className="mt-4 flex w-full flex-col space-y-4 lg:mt-0 lg:w-80 lg:space-y-8">
              <li className="flex w-full items-center justify-between px-4 lg:px-0">
                <p>名前:</p>
                <p className="font-bold">{session.name}</p>
              </li>
              <li className="flex w-full items-center justify-between px-4 lg:px-0">
                <p>卒業・卒業予定年度</p>
                <p className="font-bold">
                  {session.graduationYear || "未設定"}
                </p>
              </li>
            </ul>
          </div>
          <hr className="h-[1px] border-none bg-red" />
        </div>
      </div>
    </div>
  );
};

export default page;
