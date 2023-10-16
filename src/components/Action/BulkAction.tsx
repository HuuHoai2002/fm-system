"use client";

import { Button } from "@nextui-org/react";
import classNames from "classnames";
import React from "react";
import { toast } from "react-toastify";
import ButtonLink from "../Button/ButtonLink";
import { BulkAction } from "../Table/TableContainer";

interface BulkActionProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: BulkAction;
  open: boolean;
  selectedKeys: string[];
  baseHref: string; // base href for action
  onDelete?: (id: string) => Promise<void>;
}

const BulkAction = React.forwardRef<HTMLDivElement, BulkActionProps>(
  ({ open, actions, baseHref, selectedKeys, onDelete, ...props }, ref) => {
    const baseBulkActions: BulkAction = React.useMemo<BulkAction>(
      () => [
        {
          name: "Xem chi tiết",
          href: `${baseHref}/edit/${selectedKeys[0]}?action=view&viewport=detail`,
        },
        {
          name: "Cập nhật",
          href: `${baseHref}/edit/${selectedKeys[0]}?action=edit&viewport=detail`,
        },
        {
          name: "Xóa bỏ",
          onClick: async () => {
            if (onDelete && selectedKeys.length > 0) {
              await onDelete(selectedKeys[0]);
            } else {
              toast.error("Không thể xóa bỏ dữ liệu này!");
            }
          },
        },
      ],
      [baseHref, onDelete, selectedKeys]
    );

    return (
      <div
        className={classNames(
          "fixed bottom-[74px] bg-white w-full border border-gray-200 shadow-lg max-w-[80%] md:max-w-xl rounded-full select-none translate-y-[500%] transition-all duration-300",
          {
            "!block !select-all !translate-y-0": open,
          }
        )}
        {...props}
        ref={ref}
      >
        <div className={classNames("w-full p-3 rounded-md")}>
          {/* <div className="mb-2">
            <span className="font-medium text-green-500 text-xs transition-all select-none">
              #{selectedKeys[0]}
            </span>
          </div> */}
          <div className="w-full flex items-center justify-center gap-x-3">
            {baseBulkActions.map((action) =>
              action?.href ? (
                <ButtonLink
                  className="bg-blue-400 text-white !font-medium rounded-full w-24"
                  size="sm"
                  href={action.href}
                  key={action.name}
                >
                  {action.name}
                </ButtonLink>
              ) : (
                <Button
                  size="sm"
                  className="bg-red-400 text-white !font-medium rounded-full w-24"
                  key={action.name}
                  onPress={action?.onClick}
                >
                  {action.name}
                </Button>
              )
            )}
            {actions &&
              actions.map((action) =>
                action?.href ? (
                  <ButtonLink size="sm" href={action.href} key={action.name}>
                    {action.name}
                  </ButtonLink>
                ) : (
                  <Button size="sm" key={action.name} onPress={action?.onClick}>
                    {action.name}
                  </Button>
                )
              )}
          </div>
        </div>
      </div>
    );
  }
);

export default BulkAction;

BulkAction.displayName = "BulkAction";
