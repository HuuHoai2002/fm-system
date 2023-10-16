"use client";

import { appLinks, publicRoutes } from "@/config/app.config";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const robotoSlab = Roboto_Slab({
  weight: ["600"],
  subsets: ["latin"],
});

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  appName: string;
}

const Logo: React.FC<LogoProps> = ({ appName, ...props }) => {
  const pathname = usePathname();

  const isRoutesChange = publicRoutes.includes(pathname);

  return (
    <div {...props}>
      {!isRoutesChange ? (
        <Link href={appLinks.home} className={robotoSlab.className}>
          <h1 className="font-bold text-2xl md:text-4xl select-none text-slate-700">
            {appName}
          </h1>
        </Link>
      ) : (
        <a href={appLinks.home} className={robotoSlab.className}>
          <h1 className="font-bold text-2xl md:text-4xl select-none text-slate-700">
            {appName}
          </h1>
        </a>
      )}
    </div>
  );
};

export default Logo;
