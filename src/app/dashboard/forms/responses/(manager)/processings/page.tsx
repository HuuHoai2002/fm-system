import { Metadata } from "next";
import React from "react";
import FormResponseManagerClient from "../FormResponsesManagerClient";

export const metadata: Metadata = {
  title: "Các mẫu đơn đang chờ xử lý | FM System",
  description: "Các mẫu đơn đang chờ xử lý FM System",
};

export const dynamic = "force-dynamic";

const FormResponseProcessingsPage: React.FC = () => {
  return <FormResponseManagerClient status="processings" />;
};

export default FormResponseProcessingsPage;
