"use client";

import FormContainer from "@/components/Form/FormContainer";
import FormGroup from "@/components/Form/FormGroup";
import InputControl from "@/components/Input/InputControl";
import InputPassword from "@/components/Input/InputPassword";
import Center from "@/components/Layout/Center";
import { FORGOT_PASSWORD_PATH, HOME_PATH } from "@/constants/paths";
import { resetPassword } from "@/services/auth.service";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiKey } from "react-icons/hi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from "yup";

const schema = yup.object().shape({
  new_password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không được quá 50 ký tự"),
  confirm_password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .oneOf([yup.ref("new_password")], "Mật khẩu xác nhận không khớp"),
});

const ResetPasswordClient: React.FC = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });

  const params = useSearchParams();
  const router = useRouter();
  const token: string = params.get("token") || "";

  React.useEffect(() => {
    if (!token) {
      router.push(FORGOT_PASSWORD_PATH);
    }
  }, [token, router]);

  const mutation = useMutation({
    mutationFn: (data: { np: string; cp: string }) =>
      resetPassword(token, data.np, data.cp),
    onError(error: Response<null>) {
      toast.error(error?.message);
    },
    async onSuccess() {
      const result = await Swal.fire({
        title: "Thành công",
        text: "Đặt lại mật khẩu thành công",
        icon: "success",
        confirmButtonText: "Trang chủ",
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        window.location.href = HOME_PATH;
      }
    },
  });

  return (
    <div>
      <FormContainer>
        <Center>
          <h1 className="text-lg md:text-xl font-semibold">Đặt Lại Mật Khẩu</h1>
        </Center>
        <FormGroup errorMessages={errors.new_password?.message}>
          <InputControl
            name="new_password"
            control={control}
            label="Mât khẩu mới"
            placeholder="Nhập vào mật khẩu mới"
            error={Boolean(errors.new_password)}
            prependIcon={<HiKey />}
            fullWidth
            spellCheck={false}
            ring
            component={<InputPassword />}
            disabled={mutation.isSuccess}
          />
        </FormGroup>
        <FormGroup errorMessages={errors.confirm_password?.message}>
          <InputControl
            name="confirm_password"
            control={control}
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập vào mật khẩu xác nhận"
            error={Boolean(errors.confirm_password)}
            prependIcon={<HiKey />}
            fullWidth
            spellCheck={false}
            ring
            component={<InputPassword />}
            disabled={mutation.isSuccess}
          />
        </FormGroup>
        <Button
          className="bg-blue-500 !font-medium text-white"
          isLoading={mutation.isLoading}
          title={!isValid ? "Vui lòng điền đầy đủ thông tin" : "Tiếp tục"}
          onPress={
            handleSubmit(
              async (data) =>
                await mutation.mutateAsync({
                  np: data.new_password,
                  cp: data.confirm_password,
                })
            ) as any
          }
          isDisabled={mutation.isSuccess}
        >
          Đổi mật khẩu
        </Button>
      </FormContainer>
    </div>
  );
};

export default ResetPasswordClient;
