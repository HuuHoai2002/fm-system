import { IResponseProperty } from "@/types/all";
import React from "react";

interface FormReponseFieldPreviewProps {
  field: IResponseProperty | undefined;
}

const FormReponseFieldPreview: React.FC<FormReponseFieldPreviewProps> = ({
  field,
}) => {
  return (
    <div>
      <div className="bg-gray-100 rounded-md w-full p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <span className="text-sm font-medium text-blue-400">
              {field?.form_property.property.name}:
            </span>
            <div>
              {field?.value ||
                field?.selected_property_options
                  ?.map((option) => option.label)
                  .join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormReponseFieldPreview;
