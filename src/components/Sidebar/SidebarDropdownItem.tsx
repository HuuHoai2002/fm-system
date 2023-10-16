import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { SidebarItem } from "./_config";

interface SidebarDropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItem[];
  onCloseSidebar: () => void;
  icon?: React.ReactNode;
}

const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = ({
  title,
  items,
  icon,
  onCloseSidebar,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const path = usePathname();

  return (
    <div {...props}>
      <div
        className={classNames(
          "rounded-md text-sm w-full px-3 py-[13px] flex items-center gap-x-3 hover:bg-gray-100 active:scale-[0.98] duration-150 select-none cursor-pointer",
          {
            "!bg-blue-50 text-blue-500 font-medium": isExpanded,
          }
        )}
        onClick={() => setIsExpanded((o) => !o)}
      >
        {icon && icon}
        {title}
        <div className="ml-auto">
          {isExpanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-1">
          <div className="ml-4 w-full h-full border-l border-gray-200 flex flex-col gap-y-1 text-sm">
            {items.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={classNames("px-3 py-1", {
                  "!text-blue-500 font-medium": item.href === path,
                })}
                onClick={onCloseSidebar}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarDropdownItem;
