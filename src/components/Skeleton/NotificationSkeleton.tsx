import { Skeleton } from "@nextui-org/react";

const NotificationSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-[50px] rounded-md" />
      <Skeleton className="h-[30px] rounded-md" />
    </div>
  );
};

export default NotificationSkeleton;
