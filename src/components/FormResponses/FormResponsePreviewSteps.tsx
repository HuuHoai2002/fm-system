import { IDepartment } from "@/types/all";
import { Button } from "@nextui-org/react";
import classNames from "classnames";
import React from "react";
import { HiArrowDown } from "react-icons/hi2";
import { v4 as uuid } from "uuid";
import Center from "../Layout/Center";

interface FormReponsePreviewStepsProps {
  steps: {
    step_number: number;
    time_limit: number;
    department: IDepartment;
  }[];
}

const FormReponsePreviewSteps: React.FC<FormReponsePreviewStepsProps> = ({
  steps,
}) => {
  return (
    <div className="bg-white p-3 rounded-md border border-gray-300 flex flex-col gap-y-1">
      {steps.map((step, index) => (
        <div key={uuid()}>
          <div className="flex flex-col gap-1">
            <div
              className={classNames(
                "flex-1 bg-gray-100 p-2 font-medium rounded-md flex items-center justify-center"
              )}
            >
              {step.department.name}
            </div>
            {index < steps.length - 1 && (
              <Center>
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  className={classNames("text-blue-500 bg-blue-100")}
                >
                  <HiArrowDown size={12} />
                </Button>
              </Center>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormReponsePreviewSteps;
