import React from "react";
import FormResponseForwardHandler from "./FormResponseForwardHandler";
import FormResponseRejectHandler from "./FormResponseRejectHandler";

const FormResponseHandlers: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3 md:gap-5">
      <FormResponseForwardHandler />
      <FormResponseRejectHandler />
    </div>
  );
};

export default FormResponseHandlers;
