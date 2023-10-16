import { Skeleton } from "@nextui-org/react";
import classNames from "classnames";

interface EditLoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: number;
  cn?: {
    grid?: string;
    skeleton?: string;
  };
}

const EditLoadingSkeleton: React.FC<EditLoadingSkeletonProps> = ({
  item,
  className,
  cn,
  ...props
}) => {
  return (
    <div className={classNames("w-full", className)} {...props}>
      <div
        className={classNames(
          "w-full grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 lg:gap-x-7",
          cn?.grid
        )}
      >
        {new Array(item).fill(0).map((item, index) => (
          <Skeleton
            key={index}
            className={classNames(
              "w-full h-[42px] lg:h-[50px] rounded-md",
              cn?.skeleton
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Skeleton className="h-[40px] w-[200px] rounded-md" />
      </div>
    </div>
  );
};

export default EditLoadingSkeleton;
