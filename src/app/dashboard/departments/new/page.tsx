import { Metadata } from "next";
import React from "react";
import CreateDepartmentClient from "./CreateDepartmentClient";

export const metadata: Metadata = {
  title: "Tạo phòng ban | FM System",
  description: "Tạo phòng ban FM System",
};

export const dynamic = "force-dynamic";

const CreateDepartmentPage: React.FC = () => {
  return <CreateDepartmentClient />;
};

export default CreateDepartmentPage;
