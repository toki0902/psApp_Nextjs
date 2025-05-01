"use client";
import React from "react";
import { PageMenuData, PageMenuOption } from "../../types/pageMenu";
import { generatePageMenuData } from "../../utils/pageMenu";
import generatePageMenu from "./generatePageMenu";
import { Session } from "next-auth";

type Props = {
  pageMenuOption: PageMenuOption;
  session: Session | null;
};

const PageMenu = ({ pageMenuOption, session }: Props) => {
  //可変式の引数二千と
  if (!session) return null;

  const pageMenuData = generatePageMenuData(pageMenuOption, {
    userId: session?.user.userId,
  });

  const pageMenu = generatePageMenu(pageMenuData);
  return <ul className="flex space-x-2 py-1 text-red">{pageMenu}</ul>;
};

export default PageMenu;
