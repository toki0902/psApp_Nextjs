import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { buildEncodedUrl } from "../utils/url";

type ButtonChild = {
  children?: React.ReactNode;
  href?: string;
};

const Button = ({ children, href }: ButtonChild) => {
  const router = useRouter();
  const encodedUri = href ? buildEncodedUrl(href) : null;

  const redirect = () => {
    if (encodedUri) router.push(encodedUri);
    return;
  };
  return (
    <button
      onClick={redirect}
      className="bg-[url('/images/buttonFlame_2C4A52.svg')] hover:bg-[url('/images/buttonFlame_823A42.svg')] bg-contain bg-no-repeat bg-center w-80 h-20 flex justify-center items-center text-blue hover:text-red cursor-pointer text-3xl"
    >
      {children}
    </button>
  );
};

export default Button;
