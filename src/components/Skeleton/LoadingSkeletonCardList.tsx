import { Skeleton } from "@nextui-org/react";
import classNames from "classnames";
import React from "react";

interface LoadingSkeletonCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: number;
  cn?: {
    grid?: string;
    skeleton?: string;
  };
}

const LoadingSkeletonCardList: React.FC<LoadingSkeletonCardListProps> = ({
  items,
  cn,
  className,
  ...props
}) => {
  return (
    <div className={classNames("w-full", className)} {...props}>
      <div className={classNames("w-full", cn?.grid)}>
        {new Array(items).fill(0).map((item, index) => (
          <Skeleton
            key={index}
            className={classNames("w-full rounded-md", cn?.skeleton)}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeletonCardList;
