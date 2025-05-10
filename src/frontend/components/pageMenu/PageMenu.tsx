"use client";
import React from "react";
import { PageMenuNeedData, PageMenuOption } from "../../types/pageMenu";
import { generatePageMenuData } from "../../utils/pageMenu";
import PageMenuList from "./PageMenuList";

type Props = {
  pageMenuOption: PageMenuOption;
  pageMenuNeedData: PageMenuNeedData;
};

const PageMenu = ({ pageMenuOption, pageMenuNeedData }: Props) => {
  const pageMenuData = generatePageMenuData(pageMenuOption, pageMenuNeedData);

  return (
    <ul className="flex min-w-fit space-x-2 py-1 text-red">
      <PageMenuList pageMenuData={pageMenuData} />
    </ul>
  );
};

export default PageMenu;
