import { useFormResponseContext } from "@/contexts/FormResponse/FormResponseProvider";
import React from "react";
import FormResponseDetailSkeleton from "../Skeleton/FormResponseDetailSkeleton";
import FormResponseInformation from "./FormResponseInformation";
import FormResponseFieldPreview from "./FormResponsePreviewField";
import FormResponseProcesses from "./FormResponseProcesses";

interface FormResponseDetailProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormResponseDetail: React.FC<FormResponseDetailProps> = () => {
  const { data, isLoading, isSuccess } = useFormResponseContext();

  return (
    <div>
      {isLoading && <FormResponseDetailSkeleton />}
      {!isLoading && isSuccess && data ? (
        <div className="space-y-2 md:space-y-4">
          <FormResponseInformation data={data} />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.response_properties.map((field, index) => (
              <FormResponseFieldPreview key={index} field={field} />
            ))}
          </div>
          <div>
            <FormResponseProcesses processes={data.processes} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center">
            <span className="font-bold text-base">Không tìm thấy dữ liệu</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormResponseDetail;
