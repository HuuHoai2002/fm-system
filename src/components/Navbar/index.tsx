"use client";

import { NotificationProvider } from "@/contexts/Notification/NotificationProvider";
import { useAuthStore } from "@/stores/use-auth-store";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { HiMenu, HiMenuAlt2, HiOutlineLogout, HiSearch } from "react-icons/hi";
import Swal from "sweetalert2";
import Input from "../Input/Input";
import NotificationDropdown from "../Notifications/NotificationDropdown";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = React.memo(() => {
  const { showInMobile, toggle } = useSidebarStore();
  const { user, logout, status } = useAuthStore();

  const onLogout = React.useCallback(async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Đăng Xuất?",
      text: "Bạn có chắc muốn đăng xuất khỏi tài khoản này?",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Huỷ bỏ",
    });

    result.isConfirmed && (await logout());
  }, [logout]);

  return (
    <header className="w-full bg-white lg:pl-[255px] flex fixed top-0 justify-center text-black1 z-50 border-b border-gray-200">
      <div className="h-14 lg:h-20 flex w-full items-center justify-between md:gap-x-4 lg:gap-x-8 px-2 md:px-4 lg:px-5">
        <div className="w-full flex items-center justify-between gap-x-4 lg:gap-x-8">
          <div className="mr-auto block lg:hidden">
            <Button
              onPress={() => toggle()}
              isIconOnly
              className="bg-blue-100 rounded-md"
            >
              {showInMobile ? <HiMenuAlt2 /> : <HiMenu />}
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-between gap-x-4">
            <div className="w-full lg:max-w-[650px]">
              <Input
                placeholder="Nhập vào thông tin bạn muốn tìm..."
                fullWidth
                className="focus:!border-[2px] bg-gray-50"
                appendIcon={<HiSearch size={18} />}
              />
            </div>
            <div className="flex items-center gap-x-4">
              <div>
                <NotificationProvider>
                  <NotificationDropdown />
                </NotificationProvider>
              </div>
              <Dropdown backdrop="blur" aria-label="user-dropdown">
                <DropdownTrigger>
                  <Avatar
                    name={
                      user?.full_name.split(" ")[
                        user.full_name.split(" ").length - 1
                      ]
                    }
                    as="button"
                    className="bg-blue-50"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="user-dropdown-menu"
                  disabledKeys={
                    status === "unauthenticated" || status === "loading"
                      ? ["logout"]
                      : []
                  }
                >
                  <DropdownItem key="email" aria-label="email">
                    <p className="font-bold">@{user?.email.split("@")[0]}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    aria-label="logout"
                    startContent={<HiOutlineLogout size={16} />}
                    onClick={onLogout}
                  >
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;

Navbar.displayName = "Navbar";
