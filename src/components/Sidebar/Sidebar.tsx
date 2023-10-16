"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { useMediaQueryContext } from "@/hooks/use-media-query";
import { useAuthStore } from "@/stores/use-auth-store";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import classNames from "classnames";
import React from "react";
import Logo from "../Logo";
import CurrentSession from "../Session/CurrentSession";
import RenderSidebarItems from "./RenderSidebarItem";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { showInMobile, hide } = useSidebarStore();
  const { user } = useAuthStore();

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const { isDesktop } = useMediaQueryContext();

  useClickOutside(sidebarRef, () => !isDesktop && showInMobile && hide());

  return (
    <aside
      className={classNames(
        "fixed top-0 left-0 w-64 h-screen z-[50] transition-transform -translate-x-full bg-green-50 border-r border-gray-200 sm:translate-x-0",
        {
          "!translate-x-0": showInMobile,
        }
      )}
      ref={sidebarRef}
    >
      <div className="h-full px-3 pb-4 pt-6 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="p-3 mb-4 flex items-center justify-center active:scale-[0.99]">
          <Logo appName="FM System" />
        </div>
        <CurrentSession user={user} />
        <div className="space-y-2">
          <RenderSidebarItems user={user} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
