import React from "react";
import "@/src/frontend/assets/styles/global.css";

type ButtonChild = {
  children?: React.ReactNode;
};
const Button = ({ children }: ButtonChild) => {
  return (
    <button className="bg-[url('/images/buttonFlame_2C4A52.svg')] hover:bg-[url('/images/buttonFlame_823A42.svg')] bg-contain bg-no-repeat bg-center w-80 h-20 flex justify-center items-center text-blue hover:text-red cursor-pointer text-3xl">
      {children}
    </button>
  );
};

export default Button;
