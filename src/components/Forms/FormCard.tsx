"use client";

import { FORM_PATH } from "@/constants/paths";
import { IForm } from "@/types/all";
import { EFormStatus } from "@/types/enums";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  HiEllipsisVertical,
  HiMiniArrowTopRightOnSquare,
  HiTrash,
} from "react-icons/hi2";
import DocumentImage from "../../assets/images/document.png";

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  form: IForm;
}

const FormCard: React.FC<FormCardProps> = ({ form, ...props }) => {
  const router = useRouter();

  return (
    <div {...props}>
      <div
        onClick={() => {
          router.push(
            `${FORM_PATH}/edit/${form.id}?action=edit&viewport=detail`
          );
        }}
      >
        <div className="w-full bg-white rounded-md pt-2 px-2 md:pt-4 md:px-4 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer">
          <div>
            <div className="flex items-center justify-center pb-3 border-b border-gray-300">
              <Image
                src={DocumentImage.src}
                width={96}
                height={96}
                alt="document-image"
              />
            </div>
            <div className="py-2 flex flex-col w-full gap-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm text-truncate-1">
                  {form.name}
                </h3>
                <div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <HiEllipsisVertical className="text-black" size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Form Card Actions">
                      <DropdownItem key="delete" shortcut={<HiTrash />}>
                        Xóa mẫu đơn
                      </DropdownItem>
                      <DropdownItem
                        key="open-in-new-tab"
                        shortcut={<HiMiniArrowTopRightOnSquare />}
                        onPress={() => {
                          window.open(
                            `${FORM_PATH}/edit/${form.id}?action=edit&viewport=detail`,
                            "_blank"
                          );
                        }}
                      >
                        Mở trong thẻ mới
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={classNames(
                    "px-2 py-1 rounded-md select-none shrink-0 leading-none text-xs font-medium",
                    {
                      "bg-gray-500 text-white":
                        form.status === EFormStatus.DRAFT,
                      "bg-blue-500 text-white":
                        form.status === EFormStatus.PUBLISHED,
                      "bg-green-500 text-white":
                        form.status === EFormStatus.ARCHIVED,
                    }
                  )}
                >
                  {form.status === EFormStatus.DRAFT && "Bản nháp"}
                  {form.status === EFormStatus.PUBLISHED && "Đã xuất bản"}
                  {form.status === EFormStatus.ARCHIVED && "Đã lưu trữ"}
                </div>
                <span className="text-xs">
                  {moment(form.created_at).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
