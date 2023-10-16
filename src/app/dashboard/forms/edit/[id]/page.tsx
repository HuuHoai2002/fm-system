import { Metadata } from "next";
import React from "react";
import EditFormClient from "./EditFormClient";

export const metadata: Metadata = {
  title: "Cập nhật biểu mẫu | FM System",
  description: "Cập nhật biểu mẫu FM System",
};

export const dynamic = "force-dynamic";

const EditFormPage: React.FC = () => {
  return <EditFormClient />;
};

export default EditFormPage;
