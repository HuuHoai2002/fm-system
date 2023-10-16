"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import Center from "@/components/Layout/Center";
import Container from "@/components/Layout/Container";
import { appLinks } from "@/config/app.config";
import { DEPARTMENT_PATH } from "@/constants/paths";
import useAuth from "@/hooks/use-auth";
import {
  ICreateDepartment,
  createDepartment,
} from "@/services/department.service";
import { Role } from "@/types/all";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên phòng ban không được để trống")
    .min(3, "Tên phòng ban phải có tối thiểu 3 ký tự"),
  description: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự")
    .max(255, "Mật khẩu chỉ được tối đa 255 ký tự"),
});

export const metadata: Metadata = {
  title: "Tạo phòng ban | FM System",
  description: "Tạo phòng ban FM System",
};

const CreateDepartmentClient: React.FC = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateDepartment>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(schema),
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

  const mutation = useMutation({
    mutationFn: (data: ICreateDepartment) => createDepartment(data),
    onSuccess: () => {
      toast.success("Tạo phòng ban thành công!");

      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "departments",
      });

      router.push(appLinks.department);
    },
    onError: (response: Response<ICreateDepartment>) => {
      toast.error(response?.message);
    },
  });

  return (
    <div>
      <Breadcrumb title="Tạo phòng ban" backTo={DEPARTMENT_PATH} />
      <Container>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-4 lg:gap-x-7">
          <FormGroup errorMessages={errors.name?.message}>
            <InputControl
              name="name"
              control={control}
              label="Tên phòng ban"
              placeholder="Nhập vào tên phòng ban"
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
        <Center>
          <Button
            className="bg-blue-500 !font-medium text-white mt-5 text-center"
            onPress={handleSubmit((data) => mutation.mutate(data)) as any}
            isLoading={mutation.isLoading}
            title={
              !isValid ? "Vui lòng điền đầy đủ thông tin" : "Tạo phòng ban"
            }
          >
            Tạo phòng ban
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default CreateDepartmentClient;
