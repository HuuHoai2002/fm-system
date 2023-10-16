import { Metadata } from "next";
import React from "react";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Quản lý thuộc tính | FM System",
  description: "Quản lý thuộc tính FM System",
};

export const dynamic = "force-dynamic";

const PropertiesPage: React.FC = () => {
  return <PropertiesClient />;
};

export default PropertiesPage;
