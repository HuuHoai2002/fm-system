"use client";

import FormContainer from "@/components/Form/FormContainer";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import InputPassword from "@/components/Input/InputPassword";
import Center from "@/components/Layout/Center";
import { useAuthStore } from "@/stores/use-auth-store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiKey, HiPencil } from "react-icons/hi";
import Swal from "sweetalert2";
import * as yup from "yup";
import { appLinks } from "../../../config/app.config";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
    .max(50, "Mật khẩu chỉ được tối đa 50 ký tự"),
});

const LoginClient: React.FC = () => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { login } = useAuthStore();

  const router = useRouter();

  return (
    <div>
      <FormContainer>
        <Center>
          <h1 className="text-lg md:text-xl font-semibold">Đăng Nhập</h1>
        </Center>
        <FormGroup errorMessages={errors.email?.message}>
          <InputControl
            name="email"
            control={control}
            label="Email"
            placeholder="Nhập vào email của bạn"
            error={Boolean(errors.email)}
            prependIcon={<HiPencil />}
            fullWidth
            spellCheck={false}
            ring
            component={<Input />}
          />
        </FormGroup>
        <FormGroup errorMessages={errors.password?.message}>
          <InputControl
            name="password"
            control={control}
            label="Mật khẩu"
            placeholder="Nhập vào mật khẩu của bạn"
            error={Boolean(errors.password)}
            prependIcon={<HiKey />}
            fullWidth
            spellCheck={false}
            ring
            component={<InputPassword />}
          />
        </FormGroup>
        <Button
          className="bg-blue-500 !font-medium text-white"
          onPress={
            handleSubmit(async (data) => {
              const result = await login(data.email, data.password);

              if (!result.success) {
                Swal.fire({
                  icon: "error",
                  title: "Đăng nhập thất bại",
                  text: result?.message,
                  confirmButtonText: "Đóng",
                });
              }

              if (result.success) {
                router.push("/dashboard");
              }
            }) as any
          }
          isLoading={isSubmitting}
          title={!isValid ? "Vui lòng điền đầy đủ thông tin" : "Đăng Nhập"}
        >
          Đăng Nhập
        </Button>
        <div className="ml-auto">
          <span className="font-medium text-sm transition-all">
            <Link
              href={appLinks.forgotPassword}
              className="text-blue-500 hover:opacity-80 cursor-pointer hover:underline"
            >
              {" "}
              Quên mật khẩu?
            </Link>
          </span>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div>
          <span className="font-medium flex items-center justify-center text-sm transition-all">
            <div className="text-center hover:opacity-80">
              Bạn chưa có tài khoản?
            </div>
          </span>
        </div>
      </FormContainer>
    </div>
  );
};

export default LoginClient;
