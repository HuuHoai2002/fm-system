import { IDepartment } from "@/types/all";
import { Button } from "@nextui-org/react";
import React from "react";
import { HiArrowsUpDown, HiTrash } from "react-icons/hi2";
import FormGroup from "../Form/FormGroup";
import Input from "../Input/Input";
import InputControl from "../Input/InputControl";
import SelectControl from "../Input/SelectControl";

import { IBaseCreateForm } from "@/app/dashboard/forms/new/CreateFormClient";
import { FieldErrors } from "react-hook-form";
import Center from "../Layout/Center";

interface FormStepControlProps {
  control: any;
  errors: FieldErrors<IBaseCreateForm>;
  index: number;
  filteredDepartments: IDepartment[];
  onRemoveStep: (index: number) => void;
  isLast: boolean;
  canRemove: boolean;
}

const FormStepControl: React.FC<FormStepControlProps> = ({
  control,
  errors,
  index,
  filteredDepartments,
  onRemoveStep,
  isLast,
  canRemove,
}) => {
  return (
    <div>
      <div className="w-full bg-white rounded-md flex items-center gap-x-2">
        <div className="flex-1 flex items-center justify-between w-full gap-x-4">
          <div className="p-2 w-full grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <FormGroup>
              <InputControl
                control={control}
                name={`processing_steps[${index}].department_id`}
                label="Phòng ban tiếp nhận"
                error={Boolean(errors.processing_steps?.[index]?.department_id)}
                fullWidth
                placeholder="Chọn phòng ban tiếp nhận"
                component={
                  <SelectControl
                    options={
                      filteredDepartments?.map((d) => ({
                        id: d.id,
                        label: d.name,
                        value: d.id,
                      })) || []
                    }
                  />
                }
              />
            </FormGroup>
            <FormGroup>
              <InputControl
                control={control}
                fullWidth
                type="number"
                label="Thời gian xử lý (ngày)"
                name={`processing_steps[${index}].time_limit`}
                error={Boolean(errors.processing_steps?.[index]?.time_limit)}
                placeholder="Nhập vào thời gian xử lý"
                component={<Input />}
              />
            </FormGroup>
          </div>
          <div className="mr-2 my-auto">
            <Button
              isIconOnly
              size="sm"
              isDisabled={!canRemove}
              onClick={() => onRemoveStep(index)}
            >
              <HiTrash size={16} />
            </Button>
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="py-2">
          <Center>
            <Button
              isIconOnly
              size="sm"
              color="primary"
              className="text-blue-500 bg-blue-100"
            >
              <HiArrowsUpDown size={20} />
            </Button>
          </Center>
        </div>
      )}
    </div>
  );
};

export default FormStepControl;
