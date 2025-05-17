import React from "react";
import { SettingMenuDefinition } from "./settingMenuDefinition";
import SettingMenuItem from "./SettingMenuItem";

const SettingMenu = () => {
  const defKeys = Object.keys(SettingMenuDefinition).filter(
    (key): key is keyof typeof SettingMenuDefinition => {
      return key in SettingMenuDefinition;
    },
  );

  const settingMenuList = defKeys.map((key) => {
    const { label, href } = SettingMenuDefinition[key];
    return <SettingMenuItem key={key} label={label} href={href} />;
  });
  return (
    <ul className="flex h-fit w-full space-x-3 lg:w-44 lg:flex-col lg:space-x-0">
      {settingMenuList}
    </ul>
  );
};

export default SettingMenu;
