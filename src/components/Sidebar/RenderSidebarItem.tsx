import { appLinks } from "@/config/app.config";
import { useMediaQueryContext } from "@/hooks/use-media-query";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { IUser } from "@/types/all";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarDropdownItem from "./SidebarDropdownItem";
import SidebarItem from "./SidebarItem";
import {
  SidebarAdminConfig,
  SidebarConfig,
  SidebarManagerConfig,
} from "./_config";

interface RenderSidebarItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  user: IUser | null;
}

const RenderSidebarItems: React.FC<RenderSidebarItemsProps> = ({ user }) => {
  const { hide } = useSidebarStore();
  const { isDesktop } = useMediaQueryContext();

  const onCloseSidebar = React.useCallback(
    () => !isDesktop && hide(),
    [hide, isDesktop]
  );

  switch (user?.role) {
    case "ADMIN": {
      return (
        <RenderSidebarItemsWrapper
          user={user}
          config={SidebarAdminConfig}
          onCloseSidebar={onCloseSidebar}
        />
      );
    }

    case "MANAGER": {
      return (
        <RenderSidebarItemsWrapper
          user={user}
          config={SidebarManagerConfig}
          onCloseSidebar={onCloseSidebar}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default RenderSidebarItems;

const RenderSidebarItemsWrapper: React.FC<{
  config: SidebarConfig[];
  user: IUser | null;
  onCloseSidebar: () => void;
}> = ({ config, user, onCloseSidebar }) => {
  const path = usePathname();

  return (
    <div className="space-y-1 overflow-x-hidden">
      {user &&
        config.map((item) =>
          item?.items ? (
            <SidebarDropdownItem
              items={item.items}
              title={item.title}
              key={item.title}
              icon={item.icon}
              onCloseSidebar={onCloseSidebar}
            />
          ) : (
            <SidebarItem
              icon={item.icon}
              href={item.href || appLinks.home}
              key={item.title}
              isActive={path === item.href}
              onClick={onCloseSidebar}
            >
              {item.title}
            </SidebarItem>
          )
        )}
    </div>
  );
};
