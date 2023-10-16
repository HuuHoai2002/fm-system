import { Skeleton } from "@nextui-org/react";
import React from "react";
import { v4 as uuid } from "uuid";

interface FormResponseDetailSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormResponseDetailSkeleton: React.FC<
  FormResponseDetailSkeletonProps
> = () => {
  return (
    <div className="space-y-2 md:space-y-4">
      <Skeleton className="w-full h-[200px] rounded-md" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {new Array(6).fill(0).map(() => (
          <Skeleton className="w-full h-[48px] rounded-md" key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default FormResponseDetailSkeleton;
