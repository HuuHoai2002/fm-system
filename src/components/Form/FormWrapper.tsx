import classNames from "classnames";
import React from "react";
import LoadingSkeletonCardList from "../Skeleton/LoadingSkeletonCardList";

interface FormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  isEmpty: boolean;
  skeletonItems: number;
  cn?: {
    grid?: string;
    skeleton?: string;
  };
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  isLoading,
  cn,
  skeletonItems,
  isEmpty,
  children,
}) => {
  return (
    <div
      className={classNames({
        "bg-transparent p-4 rounded-xl mb-4 flex items-center": isLoading,
      })}
    >
      {isLoading && <LoadingSkeletonCardList items={skeletonItems} cn={cn} />}
      {!isLoading && isEmpty && (
        <div className="w-full flex items-center justify-center">
          <span className="text-gray-700">Không có dữ liệu</span>
        </div>
      )}
      {!isLoading && !isEmpty && children}
    </div>
  );
};

export default FormWrapper;
