import { useFormResponseContext } from "@/contexts/FormResponse/FormResponseProvider";
import useBoolean from "@/hooks/use-boolean";
import { forwardFormResponse } from "@/services/form-response.service";
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

const FormResponseForwardHandler: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { value, toggle } = useBoolean();

  const { data, handleClose, nextProcess } = useFormResponseContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { confirm: boolean; id: string }) =>
      forwardFormResponse(data),
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
        className="rounded-md border bg-green-500 text-white w-32"
      >
        Chuyển Tiếp
      </Button>
      <Modal isOpen={isOpen} size="xl" hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isLoading && (
              <Progress
                size="sm"
                color="primary"
                isIndeterminate
                aria-label="Forward Form Response Loading..."
              />
            )}
            <div className="w-full flex items-center justify-center">
              <h3>Chuyển Tiếp Mẫu Đơn</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            {nextProcess && (
              <div className="mb-3">
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-800 font-medium shrink-0">
                    Mã đơn:
                  </span>
                  <span className="font-medium text-blue-500 text-truncate-1">
                    #{data?.code}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-800 font-medium shrink-0">
                    Phòng ban tiếp nhận xử lý tiếp theo:
                  </span>
                  <span className="font-medium text-blue-500 text-truncate-1">
                    {nextProcess?.department?.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-800 font-medium shrink-0">
                    Bước xử lý:
                  </span>
                  <span className="font-medium text-blue-500 text-truncate-1">
                    {nextProcess?.step_number}
                  </span>
                </div>
              </div>
            )}
            {!nextProcess && (
              <div className="font-medium text-blue-500">
                Mẫu đơn này đang ở bước xử lý cuối cùng.
              </div>
            )}
            <div className="space-y-1">
              <span className="text-sm">
                Sau khi bạn ấn xác nhận, mẫu đơn sẽ được chuyển tiếp đến bước xử
                lý tiếp theo. Lưu ý: Bạn không thể hoàn tác hành động này nên
                hãy chắc chắn rằng mẫu đơn đã được xử lý đúng.
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
              className="rounded-md text-white font-medium bg-green-500"
              isDisabled={!value || isLoading}
              onPress={() =>
                mutate({
                  id: data?.id || "",
                  confirm: value,
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

export default FormResponseForwardHandler;
