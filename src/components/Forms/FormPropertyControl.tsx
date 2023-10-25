import React from "react";
import FormGroup from "../Form/FormGroup";

import { IBaseCreateForm } from "@/app/dashboard/forms/new/CreateFormClient";
import { useFormProperty } from "@/contexts/Form/FormPropertyProvider";
import { PropertyType } from "@/types/enums";
import { Button, Switch } from "@nextui-org/react";
import classNames from "classnames";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { FieldErrors, UseFormSetValue, useWatch } from "react-hook-form";
import { HiMiniArrowsPointingOut, HiOutlineTrash } from "react-icons/hi2";
import { v4 as uuid } from "uuid";
import Input from "../Input/Input";

interface FormPropertyControlProps {
  control: any;
  errors: FieldErrors<IBaseCreateForm>;
  index: number;
  setValue: UseFormSetValue<IBaseCreateForm>;
  onRemoveProperty: (index: number) => void;
  isDragging: boolean;
  isDisabled: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
}

const FormPropertyControl: React.FC<FormPropertyControlProps> = ({
  control,
  errors,
  index,
  onRemoveProperty,
  setValue,
  isDragging,
  dragHandleProps,
  isDisabled,
}) => {
  const _uuid = React.useMemo(() => uuid(), []);

  const { handleOpen, getSelectedProperty, handleRemoveProperty } =
    useFormProperty();

  const watch = useWatch<IBaseCreateForm>({
    control,
  });

  const isSelected = watch?.properties?.[index]?.is_required;

  const selectedProperty = React.useMemo(() => {
    return getSelectedProperty(_uuid);
  }, [getSelectedProperty, _uuid]);

  const selectedPropertyType = React.useCallback(
    (type: PropertyType) => {
      return selectedProperty?.property?.property_type === type;
    },
    [selectedProperty]
  );

  React.useEffect(() => {
    if (selectedProperty) {
      setValue(
        `properties.${index}.property_id`,
        selectedProperty?.property?.id as string
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProperty]);

  return (
    <div className="flex">
      <div
        className={classNames(
          "flex-1 w-full bg-white border border-transparent rounded-tl-md rounded-bl-md px-2 pt-2 transition-all",
          {
            "border-collapse !border-blue-500 shadow-md": isDragging,
          }
        )}
      >
        <div className="w-full">
          <FormGroup>
            <Input
              error={Boolean(errors.properties?.[index]?.property_id)}
              placeholder="Chọn thuộc tính"
              label="Chọn thuộc tính"
              value={selectedProperty?.property?.name || ""}
              className="select-none"
              fullWidth
              readOnly
              onClick={() => handleOpen(_uuid)}
            />
          </FormGroup>
        </div>
        <div className="w-full border-t border-gray-200 mt-4 py-2">
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-between gap-x-4 p-1">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="light"
                className="text-blue-500 bg-blue-100"
                onPress={() => {
                  onRemoveProperty(index);
                  handleRemoveProperty(_uuid);
                }}
                isDisabled={isDisabled}
              >
                <HiOutlineTrash size={20} />
              </Button>

              <Switch
                isSelected={isSelected}
                onValueChange={(isSelected) =>
                  setValue(`properties.${index}.is_required`, isSelected)
                }
                size="sm"
                classNames={{
                  label: "text-sm",
                }}
              >
                Bắt buộc
              </Switch>
            </div>
          </div>
        </div>
      </div>

      <div
        {...dragHandleProps}
        className="bg-blue-200 rounded-tr-md rounded-br-md flex items-center justify-center cursor-move px-3"
      >
        <HiMiniArrowsPointingOut size={20} />
      </div>
    </div>
  );
};

export default React.memo(FormPropertyControl);
