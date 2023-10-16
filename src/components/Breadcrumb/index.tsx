import { Skeleton } from "@nextui-org/skeleton";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import SmallBadge from "../Badge/SmallBadge";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  cn?: {
    base?: string;
    title?: string;
    container?: string;
  };
  backTo?: string;
  isLoading?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  cn,
  backTo,
  isLoading,
  ...props
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-x-4 bg-inherit rounded-xl mb-4",
        cn?.base
      )}
      {...props}
    >
      {backTo && (
        <Link href={backTo}>
          <SmallBadge>
            <HiArrowSmallLeft size={16} />
          </SmallBadge>
        </Link>
      )}
      {isLoading ? (
        <Skeleton className="w-56 h-7 rounded-md" />
      ) : (
        <h2
          className={classNames(
            "text-black font-bold text-base md:text-lg capitalize",
            cn?.title
          )}
        >
          {title}
        </h2>
      )}
      <div className={classNames("flex items-start", cn?.container)}></div>
    </div>
  );
};

export default Breadcrumb;
