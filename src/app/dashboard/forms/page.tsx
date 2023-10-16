import { Metadata } from "next";
import React from "react";
import FormsClient from "./FormsClient";

export const metadata: Metadata = {
  title: "Biểu mẫu | FM System",
  description: "Biểu mẫu FM System",
};

export const dynamic = "force-dynamic";

const FormsPage: React.FC = () => {
  return <FormsClient />;
};

export default FormsPage;
