"use client";

import SmallBadge from "@/components/Badge/SmallBadge";
import Breadcrumb from "@/components/Breadcrumb";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import SelectControl from "@/components/Input/SelectControl";
import Center from "@/components/Layout/Center";
import Container from "@/components/Layout/Container";
import { PROPERTY_PATH } from "@/constants/paths";
import useAuth from "@/hooks/use-auth";
import { ICreateProperty, createProperty } from "@/services/property.service";
import { Role } from "@/types/all";
import { PropertyType } from "@/types/enums";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên thuộc tính không được để trống")
    .min(3, "Tên thuộc tính phải có tối thiểu 3 ký tự")
    .max(50, "Mô tả chỉ được tối đa 255 ký tự"),
  description: yup
    .string()
    .required("Mô tả không được để trống")
    .min(8, "Mô tả phải có tối thiểu 8 ký tự")
    .max(255, "Mô tả chỉ được tối đa 255 ký tự"),
  property_type: yup.string().required("Vui lòng chọn loại thuộc tính"),
  options: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .required("Không được để trống")
          .min(1, "Tối thiểu 8 ký tự")
          .max(50, "Tối đa 255 ký tự"),
        value: yup
          .string()
          .required("Không được để trống")
          .min(1, "Tối thiểu 1 ký tự")
          .max(50, "Tối đa 255 ký tự"),
        description: yup
          .string()
          .required("Không được để trống")
          .min(1, "Tối thiểu 1 ký tự")
          .max(50, "Tối đa 255 ký tự"),
      })
    )
    .optional(),
});

const CreatePropertyClient: React.FC = () => {
  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Omit<ICreateProperty, "is_multiple">>({
    mode: "all",
    defaultValues: {},
    resolver: yupResolver(schema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const watchPropertyType = watch("property_type");

  const isPropertyMultiple = React.useMemo(() => {
    return (
      watchPropertyType === PropertyType.CHECKBOX ||
      watchPropertyType === PropertyType.RADIO ||
      watchPropertyType === PropertyType.SELECT
    );
  }, [watchPropertyType]);

  const mutation = useMutation({
    mutationFn: (data: Omit<ICreateProperty, "is_multiple">) => {
      return createProperty({
        ...data,
        is_multiple: isPropertyMultiple,
        options: isPropertyMultiple ? data.options : undefined,
      });
    },
    onSuccess: () => {
      toast.success("Tạo thuộc tính thành công!");

      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "properties",
      });

      router.push(PROPERTY_PATH);
    },
    onError: (response: Response<ICreateProperty>) => {
      toast.error(response?.message);
    },
  });

  React.useEffect(() => {
    if (isPropertyMultiple && fields.length === 0) {
      append({
        label: "",
        value: "",
        description: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPropertyMultiple]);

  return (
    <div>
      <Breadcrumb title="Tạo thuộc tính" backTo={PROPERTY_PATH} />
      <Container>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-4 lg:gap-x-7 mb-2">
          <FormGroup errorMessages={errors.name?.message}>
            <InputControl
              name="name"
              control={control}
              label="Tên thuộc tính"
              placeholder="Nhập vào tên thuộc tính"
              error={Boolean(errors.name)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
          </FormGroup>
          <FormGroup errorMessages={errors.description?.message}>
            <InputControl
              name="description"
              control={control}
              label="Mô tả"
              placeholder="Nhập vào mô tả"
              error={Boolean(errors.description)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup errorMessages={errors.property_type?.message}>
            <InputControl
              name="property_type"
              control={control}
              label="Loại thuộc tính"
              placeholder="Chọn loại thuộc tính"
              error={Boolean(errors.property_type)}
              fullWidth
              component={
                <SelectControl
                  options={[
                    {
                      label: "Chuỗi ký tự (text)",
                      value: PropertyType.TEXT,
                    },
                    {
                      label: "Chọn một (radio)",
                      value: PropertyType.RADIO,
                    },
                    {
                      label: "Chọn nhiều (checkbox)",
                      value: PropertyType.CHECKBOX,
                    },
                    {
                      label: "Chọn một (select)",
                      value: PropertyType.SELECT,
                    },
                    {
                      label: "Ngày giờ (datetime)",
                      value: PropertyType.DATETIME,
                    },
                    {
                      label: "Khoảng giá trị (range)",
                      value: PropertyType.RANGE,
                    },
                  ]}
                />
              }
            />
          </FormGroup>
          {isPropertyMultiple && (
            <div className="w-full mb-3 space-y-2 mt-2 p-2 border border-gray-200 rounded-md">
              {fields.map((item, index) => (
                <div key={item.id} className="flex w-full items-center gap-x-2">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <FormGroup
                      errorMessages={
                        errors?.options &&
                        errors?.options[index]?.label?.message
                      }
                    >
                      <InputControl
                        control={control}
                        name={`options[${index}].label`}
                        component={<Input />}
                        fullWidth
                        placeholder={"Tên tùy chọn " + (index + 1)}
                      />
                    </FormGroup>
                    <FormGroup
                      errorMessages={
                        errors?.options &&
                        errors?.options[index]?.value?.message
                      }
                    >
                      <InputControl
                        control={control}
                        name={`options[${index}].value`}
                        component={<Input />}
                        fullWidth
                        placeholder={"Giá trị tùy chọn " + (index + 1)}
                      />
                    </FormGroup>
                    <FormGroup
                      errorMessages={
                        errors?.options &&
                        errors?.options[index]?.description?.message
                      }
                    >
                      <InputControl
                        control={control}
                        name={`options[${index}].description`}
                        component={<Input />}
                        fullWidth
                        placeholder={"Mô tả tùy chọn " + (index + 1)}
                      />
                    </FormGroup>
                  </div>
                  {fields.length > 1 && (
                    <SmallBadge
                      className="mr-auto"
                      onClick={() => remove(index)}
                    >
                      <HiOutlineTrash size={16} />
                    </SmallBadge>
                  )}
                </div>
              ))}
              <Button
                variant="bordered"
                size="sm"
                className="mt-2"
                onPress={() =>
                  append({
                    label: "",
                    value: "",
                    description: "",
                  })
                }
              >
                Thêm tùy chọn
              </Button>
            </div>
          )}
        </div>
        <Center>
          <Button
            className="bg-blue-500 !font-medium text-white mt-5 text-center"
            onPress={handleSubmit((data) => mutation.mutate(data)) as any}
            isLoading={mutation.isLoading}
            title={
              !isValid ? "Vui lòng điền đầy đủ thông tin" : "Tạo thuộc tính"
            }
          >
            Tạo thuộc tính
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default CreatePropertyClient;
