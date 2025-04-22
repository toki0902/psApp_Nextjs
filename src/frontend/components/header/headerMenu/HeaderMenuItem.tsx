import React from "react";

const HeaderMenuItem = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <li className="h-10">
      <button
        className="flex h-full w-full items-center justify-start rounded-md hover:bg-[rgba(130,58,66,0.3)]"
        onClick={onClick}
      >
        <div className="mr-2 h-6 w-6">
          <img src={icon} alt="icon" className="w-full" />
        </div>
        <p className="text-base">{text}</p>
      </button>
    </li>
  );
};

export default HeaderMenuItem;
