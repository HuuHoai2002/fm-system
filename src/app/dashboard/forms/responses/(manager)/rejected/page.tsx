import { Metadata } from "next";
import React from "react";
import FormResponseManagerClient from "../FormResponsesManagerClient";

export const metadata: Metadata = {
  title: "Các mẫu đơn đã từ chối | FM System",
  description: "Các mẫu đơn đã từ chối FM System",
};

export const dynamic = "force-dynamic";

const FormResponseRejectedPage: React.FC = () => {
  return <FormResponseManagerClient status="rejects" />;
};

export default FormResponseRejectedPage;
