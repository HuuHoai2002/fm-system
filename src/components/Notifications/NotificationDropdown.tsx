import { useNotificationContext } from "@/contexts/Notification/NotificationProvider";
import { getAllNotifications } from "@/services/notification.service";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { HiBell } from "react-icons/hi2";
import NotificationCard from "./NotificationCard";

const NotificationDropdown: React.FC = () => {
  const { data: notifications } = useQuery({
    queryFn: () => getAllNotifications(),
    queryKey: ["notifications"],
    keepPreviousData: true,
  });

  const { handleOpen } = useNotificationContext();

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            radius="full"
            className="!border border-blue-500 text-blue-500"
            isIconOnly
            variant="bordered"
          >
            <HiBell size={24} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Notifications Dropdown"
          disabledKeys={["title"]}
        >
          <DropdownSection aria-label="Common" className="w-96">
            <DropdownItem className="w-full" key="title">
              <div className="w-full flex items-center justify-center">
                <span className="font-bold text-base md:text-lg">
                  Thông báo
                </span>
              </div>
            </DropdownItem>

            {notifications &&
              notifications?.data?.results?.map((item) => (
                <DropdownItem key={item.id} onClick={() => handleOpen(item.id)}>
                  <NotificationCard data={item} />
                </DropdownItem>
              ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationDropdown;
