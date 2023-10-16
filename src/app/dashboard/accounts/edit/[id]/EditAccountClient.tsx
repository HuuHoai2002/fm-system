"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import SelectControl from "@/components/Input/SelectControl";
import Center from "@/components/Layout/Center";
import Container from "@/components/Layout/Container";
import EditLoadingSkeleton from "@/components/Skeleton/EditLoadingSkeleton";
import TextFieldViewer from "@/components/Viewer/TextFieldViewer";
import { appLinks } from "@/config/app.config";
import { ACCOUNT_PATH } from "@/constants/paths";
import useDepartments from "@/hooks/api/use-department";
import useAuth from "@/hooks/use-auth";
import {
  IUpdateAccount,
  getOneAccount,
  updateAccount,
} from "@/services/account.service";
import { Role } from "@/types/all";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
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

const EditAccountClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    setValue,
    reset,
  } = useForm<IUpdateAccount>({
    mode: "all",
    defaultValues: {
      email: "",
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

  const {
    data: account,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["account", params.id],
    queryFn: () => getOneAccount(params?.id as string),
    enabled: Boolean(params?.id),
    onSuccess: (response) => {
      reset({
        email: response?.data?.email,
        full_name: response?.data?.full_name,
        role: response?.data?.role,
        department_id: response?.data?.department_id,
      });
    },
    onError: () => {
      toast.error("Không tìm thấy tài khoản");
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const mutation = useMutation({
    mutationFn: (data: IUpdateAccount) =>
      updateAccount(account?.data?.id as string, data),
    onSuccess: () => {
      toast.success("Cập nhật khoản thành công!");

      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "accounts", //
      });

      router.push(appLinks.account);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi khi cập nhật tài khoản!");
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
      <Breadcrumb
        isLoading={isFetching}
        title={account?.data?.full_name}
        backTo={ACCOUNT_PATH}
      />
      {isFetching && <EditLoadingSkeleton item={8} />}
      {!isFetching && isSuccess && (
        <Container>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-4 lg:gap-x-7">
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
            <FormGroup>
              <TextFieldViewer
                label="Địa chỉ"
                value={(account?.data?.address as string) || "Chưa cập nhật"}
              />
            </FormGroup>
            <FormGroup>
              <TextFieldViewer
                label="Số điện thoại"
                value={(account?.data?.phone as string) || "Chưa cập nhật"}
              />
            </FormGroup>
            <FormGroup errorMessages={errors.role?.message}>
              <InputControl
                name="role"
                control={control}
                label="Quyền"
                placeholder="Chọn quyền cho tài khoản"
                defaultValue={watch("role")}
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
                !isValid ? "Vui lòng điền đầy đủ thông tin" : "Thêm tài khoản"
              }
            >
              Cập nhật
            </Button>
          </Center>
        </Container>
      )}
    </div>
  );
};

export default EditAccountClient;
