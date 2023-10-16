import { IUser } from "@/types/all";
import React from "react";
import { HiMiniUserCircle, HiMiniUserGroup } from "react-icons/hi2";
import Permission from "../Permission";

interface CurrentSessionProps extends React.HTMLAttributes<HTMLDivElement> {
  user: IUser | null;
}

const CurrentSession: React.FC<CurrentSessionProps> = ({ user, ...props }) => {
  return (
    <div {...props}>
      {user && (
        <div className="bg-gray-50 rounded-md p-3 mb-4 space-y-2">
          <div className="text-sm text-gray-500">Phiên đăng nhập hiện tại</div>
          <div className="text-sm text-gray-600 flex items-center gap-x-2">
            <HiMiniUserCircle size={20} />
            <span className="text-sm font-semibold">{user?.full_name}</span>
          </div>
          {user.department && (
            <div className="text-sm text-gray-600 flex items-center gap-x-2">
              <HiMiniUserGroup size={20} />
              <span className="text-sm font-semibold">
                {user.department.name}
              </span>
            </div>
          )}
          <div className="text-sm text-gray-600 flex items-center gap-x-2">
            <Permission role={user?.role} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentSession;
