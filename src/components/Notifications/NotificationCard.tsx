import { INotification } from "@/types/all";
import { ENotificationFrom } from "@/types/enums";
import classNames from "classnames";
import React from "react";

interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: INotification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  data,
  ...props
}) => {
  return (
    <>
      <div className="space-y-1" {...props}>
        <div className="font-medium text-base flex items-center gap-x-2">
          <span
            className={classNames(
              "px-1 text-[10px] inline-flex rounded-md items-center justify-center",
              {
                "bg-blue-400 text-white":
                  data.from === ENotificationFrom.SYSTEM,
                "bg-indigo-400 text-white":
                  data.from === ENotificationFrom.ADMIN,
                "bg-green-400 text-white":
                  data.from === ENotificationFrom.MANAGER,
              }
            )}
          >
            {
              {
                [ENotificationFrom.SYSTEM]: "Hệ thống",
                [ENotificationFrom.ADMIN]: "Quản trị viên",
                [ENotificationFrom.MANAGER]: "Quản lý",
              }[data.from]
            }
          </span>
          {data.title}
        </div>
        <p className="text-xs text-gray-500 text-truncate-1">{data.content}</p>
      </div>
    </>
  );
};

export default NotificationCard;
