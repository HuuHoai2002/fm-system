"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import InputPassword from "@/components/Input/InputPassword";
import SelectControl from "@/components/Input/SelectControl";
import Center from "@/components/Layout/Center";
import Container from "@/components/Layout/Container";
import { appLinks } from "@/config/app.config";
import { ACCOUNT_PATH } from "@/constants/paths";
import useDepartments from "@/hooks/api/use-department";
import useAuth from "@/hooks/use-auth";
import { ICreateAccount, createAccount } from "@/services/account.service";
import { Role } from "@/types/all";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có tối thiểu 6 ký tự")
    .max(50, "Mật khẩu chỉ được tối đa 50 ký tự"),
  full_name: yup
    .string()
    .required("Họ và tên không được để trống")
    .min(8, "Họ và tên phải có tối thiểu 6 ký tự")
    .max(50, "Họ và tên chỉ được tối đa 50 ký tự"),
  role: yup.string().required("Vui lòng chọn quyền cho tài khoản"),
  department_id: yup
    .string()
    .required("Vui lòng chọn phòng ban cho tài khoản")
    .optional(),
});

const CreateAccountClient: React.FC = () => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    watch,
    handleSubmit,
    setValue,
  } = useForm<ICreateAccount>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      role: "",
      department_id: undefined,
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
    mutationFn: (data: ICreateAccount) => createAccount(data),
    onSuccess: () => {
      toast.success("Tạo tài khoản thành công!");

      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "accounts",
      });

      router.push(appLinks.account);
    },
    onError: (response: Response<ICreateAccount>) => {
      toast.error(response?.message);
    },
  });

  const { departments } = useDepartments();

  const watchRole = watch("role");

  React.useEffect(() => {
    if (watchRole !== Role.MANAGER) {
      setValue("department_id", undefined);
    }
  }, [setValue, watchRole]);

  return (
    <div>
      <Breadcrumb title="Tạo tài khoản" backTo={ACCOUNT_PATH} />
      <Container>
        <div className="w-full grid grid-cols-1 gap-y-2 lg:grid-cols-2 gap-x-4 lg:gap-x-7">
          <FormGroup errorMessages={errors.email?.message}>
            <InputControl
              name="email"
              control={control}
              label="Email"
              placeholder="Nhập vào email"
              error={Boolean(errors.email)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
          </FormGroup>
          <FormGroup errorMessages={errors.full_name?.message}>
            <InputControl
              name="full_name"
              control={control}
              label="Họ và tên"
              placeholder="Nhập vào họ và tên"
              error={Boolean(errors.full_name)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
          </FormGroup>
          <FormGroup errorMessages={errors.password?.message}>
            <InputControl
              name="password"
              control={control}
              label="Mật khẩu"
              placeholder="Nhập vào mật khẩu"
              error={Boolean(errors.password)}
              fullWidth
              spellCheck={false}
              component={<InputPassword />}
            />
          </FormGroup>
          <FormGroup errorMessages={errors.role?.message}>
            <InputControl
              name="role"
              control={control}
              label="Quyền"
              placeholder="Chọn quyền cho tài khoản"
              error={Boolean(errors.role)}
              fullWidth
              component={
                <SelectControl
                  options={[
                    {
                      label: "Quản trị viên",
                      value: Role.ADMIN,
                    },
                    {
                      label: "Quản lý",
                      value: Role.MANAGER,
                    },
                    {
                      label: "Người dùng",
                      value: Role.USER,
                    },
                  ]}
                />
              }
            />
          </FormGroup>
          {watch("role") === Role.MANAGER && (
            <FormGroup errorMessages={errors.department_id?.message}>
              <InputControl
                name="department_id"
                control={control}
                label="Phòng ban"
                placeholder="Chọn phòng ban"
                error={Boolean(errors.department_id)}
                defaultValue={watch("department_id")}
                fullWidth
                component={
                  <SelectControl
                    options={departments.map((i) => ({
                      label: i.name,
                      value: i.id,
                    }))}
                  />
                }
              />
            </FormGroup>
          )}
        </div>
        <Center>
          <Button
            className="bg-blue-500 !font-medium text-white mt-5 text-center"
            onPress={handleSubmit((data) => mutation.mutate(data)) as any}
            isLoading={mutation.isLoading}
            title={
              !isValid ? "Vui lòng điền đầy đủ thông tin" : "Tạo tài khoản"
            }
          >
            Tạo tài khoản
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default CreateAccountClient;
