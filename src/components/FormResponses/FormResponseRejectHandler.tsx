import { useFormResponseContext } from "@/contexts/FormResponse/FormResponseProvider";
import useBoolean from "@/hooks/use-boolean";
import { rejectFormResponse } from "@/services/form-response.service";
import { Response } from "@/types/response";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Input from "../Input/Input";

const FormResponseRejectHandler: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { value, toggle } = useBoolean();

  const { data, handleClose, nextProcess } = useFormResponseContext();

  const queryClient = useQueryClient();

  const [reason, setReason] = React.useState<string>("");

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: {
      confirm: boolean;
      id: string;
      rejected_reason: string;
    }) => rejectFormResponse(data),
    onSuccess: (response: Response<any>) => {
      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "form_response_processings",
      });

      toast.success(response?.message);

      onClose();
      handleClose();
    },
    onError: (response: Response<any>) => {
      toast.error(response?.message);
    },
  });

  return (
    <div>
      <Button
        onPress={onOpen}
        className="rounded-md border bg-orange-500 text-white w-32"
      >
        Từ Chối
      </Button>
      <Modal isOpen={isOpen} size="xl" hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isLoading && (
              <Progress
                size="sm"
                color="primary"
                isIndeterminate
                aria-label="Reject Form Response Loading..."
              />
            )}
            <div className="w-full flex items-center justify-center">
              <h3>Từ Chối Mẫu Đơn</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center gap-x-2">
              <span className="text-gray-800 font-medium shrink-0">
                Mã đơn:
              </span>
              <span className="font-medium text-blue-500 text-truncate-1">
                #{data?.code}
              </span>
            </div>
            <div className="mb-3">
              <Input
                placeholder="Nhập vào lý do từ chối mẫu đơn này"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                small
                fullWidth
              />
            </div>
            <div className="space-y-1">
              <span className="text-sm">
                Sau khi bạn ấn xác nhận, mẫu đơn sẽ được từ chối và hệ thống sẽ
                tự động hoàn trả mẫu đơn về cho người dùng. Lưu ý: Bạn không thể
                hoàn tác hành động này nên hãy kiểm tra kỹ trước khi từ chối.
              </span>
              <div>
                <Switch
                  isSelected={value}
                  onValueChange={toggle}
                  size="sm"
                  classNames={{
                    label: "text-sm font-medium",
                  }}
                >
                  Tôi đã đọc và hiểu rõ những điều trên
                </Switch>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              className="rounded-md text-white font-medium bg-orange-500"
              isDisabled={!value || isLoading || !reason}
              onPress={() =>
                mutate({
                  id: data?.id || "",
                  confirm: value,
                  rejected_reason: reason,
                })
              }
            >
              Xác Nhận
            </Button>
            <Button
              color="default"
              className="rounded-md font-medium"
              onPress={onClose}
              isDisabled={isLoading}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormResponseRejectHandler;
