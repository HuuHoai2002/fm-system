import { FormPropertyProvider } from "@/contexts/Form/FormPropertyProvider";
import { Metadata } from "next";
import React from "react";
import CreateFormClient from "./CreateFormClient";

export const metadata: Metadata = {
  title: "Tạo biểu mẫu | FM System",
  description: "Tạo biểu mẫu FM System",
};

export const dynamic = "force-dynamic";

const FormsPage: React.FC = () => {
  return (
    <>
      <FormPropertyProvider>
        <CreateFormClient />
      </FormPropertyProvider>
    </>
  );
};

export default FormsPage;
