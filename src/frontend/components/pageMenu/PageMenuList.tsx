"use client";
import React from "react";
import { PageMenuData } from "../../types/pageMenu";
import { PageMenuDefinition } from "./pageMenuDefinitions";
import PageMenuItem from "./PageMenuItem";
import { useModal } from "../../hooks/useModal";
import { useRouter } from "next/navigation";

type Props = { pageMenuData: PageMenuData };

const PageMenuList = ({ pageMenuData }: Props) => {
  const openModal = useModal().openModal;
  const router = useRouter();

  const defKeys = Object.keys(pageMenuData).filter(
    (key): key is keyof typeof PageMenuDefinition => {
      return key in PageMenuDefinition;
    },
  );

  return defKeys.map((key) => {
    const { getText, icon, getOnClick } = PageMenuDefinition[key];

    return (
      <PageMenuItem
        key={key}
        text={getText(pageMenuData)}
        icon={icon}
        onClick={getOnClick(pageMenuData, openModal, router)}
      />
    );
  });
};

export default PageMenuList;
