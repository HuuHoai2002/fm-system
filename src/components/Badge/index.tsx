import React from "react";

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  children: React.ReactNode;
  content?: string | number;
}

const Badge: React.FC<BadgeProps> = ({ children, content, ...props }) => {
  return (
    <div
      {...props}
      className="relative p-3 rounded-md bg-blue-50 hover:bg-blue-400 active:scale-[0.95] transition-all hover:text-white text-blue-400 flex items-center justify-center cursor-pointer "
    >
      <div className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 flex items-center justify-center text-xs text-white">
        {content}
      </div>
      {children}
    </div>
  );
};

export default Badge;
