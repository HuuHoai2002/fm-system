"use client";

import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  icon,
  isActive,
  href,
  ...props
}) => {
  return (
    <div {...props}>
      <Link
        href={href}
        className={classNames(
          "rounded-md text-sm w-full px-3 py-[13px] flex items-center gap-x-3 hover:bg-gray-100 active:scale-[0.98] duration-150 select-none cursor-pointer",
          {
            "!bg-blue-50 text-blue-500 font-medium": isActive,
          }
        )}
      >
        <div
          className={classNames({
            "text-blue-500": isActive,
          })}
        >
          {icon}
        </div>
        {children}
      </Link>
    </div>
  );
};

export default SidebarItem;
