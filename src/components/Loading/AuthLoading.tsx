"use client";

import { useAuthStore } from "@/stores/use-auth-store";
import { Progress } from "@nextui-org/react";
import React from "react";

interface AuthLoadingProps {}

const AuthLoading: React.FC<AuthLoadingProps> = () => {
  const { status } = useAuthStore();

  return (
    <div>
      <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gray-50">
        <div className="py-8">
          <h1 className="font-bold text-2xl md:text-4xl select-none text-slate-700">
            FM System
          </h1>
        </div>
        <Progress
          size="sm"
          isIndeterminate
          aria-label="AuthState Loading..."
          className="max-w-md"
        />

        <div className="pt-4">
          {status === "loading" ||
            (true && (
              <span className="text-sm text-gray-500">
                Đang xác thực người dùng
              </span>
            ))}
          {status === "unauthenticated" && (
            <span className="text-sm text-gray-500">
              Đang chuyển hướng đến trang đăng nhập
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
