import { Metadata } from "next";
import React from "react";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Bảng điều khiển | FM System",
  description: "Bảng điều khiển FM System",
};

export const dynamic = "force-dynamic";

const DashboardPage: React.FC = () => {
  return <DashboardClient />;
};

export default DashboardPage;
