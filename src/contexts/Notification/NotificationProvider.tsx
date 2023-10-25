"use client";

import Center from "@/components/Layout/Center";
import NotificationSkeleton from "@/components/Skeleton/NotificationSkeleton";
import { getNotificationDetail } from "@/services/notification.service";
import { ENotificationFrom } from "@/types/enums";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface NotificationContextProps {
  isOpen: boolean;
  handleOpen: (notificationId: string) => void;
  handleClose: () => void;
}

const initialContextState: NotificationContextProps = {
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
};

export const NotificationContext =
  React.createContext<NotificationContextProps>(initialContextState);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [notificationId, setNotificationId] = React.useState<string | null>();

  const handleOpen = React.useCallback(
    (notificationId: string) => {
      setNotificationId(notificationId);

      onOpen();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClose = React.useCallback(() => {
    setNotificationId(null);

    onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: notification, isFetching } = useQuery({
    queryKey: [`notification_detail_${notificationId}`],
    queryFn: () => getNotificationDetail(notificationId || ""),
    enabled: !!notificationId,
    cacheTime: 0,
  });

  const getContentHighLight = (str: string) => {
    const strArr = str.split(" ");

    return strArr.map((i) => {
      if (i.startsWith("FMS")) {
        return `<span class="font-bold text-blue-500">${i}</span>`;
      }

      return i;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        handleOpen,
        handleClose,
      }}
    >
      <>
        <Modal
          size="3xl"
          isOpen={isOpen}
          scrollBehavior="inside"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Center>Thông Báo</Center>
              </ModalHeader>
              <ModalBody>
                {isFetching && <NotificationSkeleton />}
                {notification?.data && (
                  <div className="w-full space-y-1">
                    <div className="font-medium text-base md:text-lg flex items-center gap-x-2">
                      <span
                        className={classNames(
                          "px-1 text-[10px] inline-flex rounded-md items-center justify-center",
                          {
                            "bg-blue-400 text-white":
                              notification?.data?.from ===
                              ENotificationFrom.SYSTEM,
                            "bg-indigo-400 text-white":
                              notification?.data?.from ===
                              ENotificationFrom.ADMIN,
                            "bg-green-400 text-white":
                              notification?.data?.from ===
                              ENotificationFrom.MANAGER,
                          }
                        )}
                      >
                        {
                          {
                            [ENotificationFrom.SYSTEM]: "Hệ thống",
                            [ENotificationFrom.ADMIN]: "Quản trị viên",
                            [ENotificationFrom.MANAGER]: "Quản lý",
                          }[notification?.data?.from]
                        }
                      </span>
                      {notification?.data?.title}
                    </div>
                    <p
                      className="text-base text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: getContentHighLight(
                          notification?.data?.content || ""
                        ).join(" "),
                      }}
                    ></p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={handleClose}>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextProps => {
  const { handleClose, handleOpen, isOpen } =
    React.useContext(NotificationContext);

  return {
    handleClose,
    handleOpen,
    isOpen,
  };
};
