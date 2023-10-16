import React from "react";

const Forbidden: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-base md:text-xl text-red-400">
        Quyền truy cập của bạn không đủ để vào trang này!
      </span>
    </div>
  );
};

export default Forbidden;
