import { DM_Sans, Martian_Mono, Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";

export const architype_bayer = localFont({ src: "./Architype_Bayer.woff2" });

export const dm_sans = DM_Sans({
  variable: "--font-dm_sans",
  subsets: ["latin"],
});
export const red_hat_display = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

export const martian_mono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});
