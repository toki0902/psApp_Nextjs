import { Noto_Serif } from "next/font/google";
import { Caveat } from "next/font/google";
import { Baloo_2 } from "next/font/google";

export const Noto_Serif_bold = Noto_Serif({
  weight: ["500"],
  subsets: ["latin"],
});

export const Caveat_thin = Caveat({ weight: ["400"], subsets: ["latin"] });

export const Baloo_thin = Baloo_2({ weight: ["400"], subsets: ["latin"] });
