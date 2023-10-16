import { Metadata } from "next";
import React from "react";
import FormResponseManagerClient from "../FormResponsesManagerClient";

export const metadata: Metadata = {
  title: "Các mẫu đơn đã qua xử lý | FM System",
  description: "Các mẫu đơn đã qua xử lý FM System",
};

export const dynamic = "force-dynamic";

const FormResponseProcessedPage: React.FC = () => {
  return <FormResponseManagerClient status="processed" />;
};

export default FormResponseProcessedPage;
