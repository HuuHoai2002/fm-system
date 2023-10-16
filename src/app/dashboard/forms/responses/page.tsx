import { FormResponseProvider } from "@/contexts/FormResponse/FormResponseProvider";
import { Metadata } from "next";
import React from "react";
import FormResponsesClient from "./FormResponsesClient";

export const metadata: Metadata = {
  title: "Phản hồi mẫu đơn | FM System",
  description: "Phản hồi mẫu đơn FM System",
};

export const dynamic = "force-dynamic";

const FormResponsesPage: React.FC = () => {
  return (
    <FormResponseProvider>
      <FormResponsesClient />
    </FormResponseProvider>
  );
};

export default FormResponsesPage;
