"use client";

import Alert from "@/components/Alert";
import FormContainer from "@/components/Form/FormContainer";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import Center from "@/components/Layout/Center";
import { forgotPassword } from "@/services/auth.service";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Địa chỉ Email không được để trống")
    .email("Địa chỉ Email không hợp lệ"),
});

const ForgotPasswordClient: React.FC = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onError: (error: Response<null>) => {
      toast.error(error?.message);
    },
  });

  return (
    <div>
      <FormContainer>
        <Center>
          <h1 className="text-lg md:text-xl font-semibold">Quên Mật Khẩu</h1>
        </Center>
        {mutation.isSuccess && (
          <Alert>
            Đã gửi email đổi lại mật khẩu đến hòm thư của bạn. Vui lòng kiểm tra
            hòm thư, chú ý cả hòm thư rác.
          </Alert>
        )}
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
            disabled={mutation.isSuccess}
          />
        </FormGroup>
        <Button
          className="bg-blue-500 !font-medium text-white"
          isLoading={mutation.isLoading}
          title={!isValid ? "Vui lòng điền đầy đủ thông tin" : "Tiếp tục"}
          onPress={
            handleSubmit(
              async (data) => await mutation.mutateAsync(data.email)
            ) as any
          }
          isDisabled={mutation.isSuccess}
        >
          Tiếp tục
        </Button>
      </FormContainer>
    </div>
  );
};

export default ForgotPasswordClient;
