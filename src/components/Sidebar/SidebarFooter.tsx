"use client";

import React from "react";
import Permission from "../Permission";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter: React.FC<SidebarFooterProps> = () => {
  return (
    <div>
      <Permission />
    </div>
  );
};

export default SidebarFooter;
