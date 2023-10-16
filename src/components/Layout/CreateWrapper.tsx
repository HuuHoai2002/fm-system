import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

interface CreateWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  buttonContent: string;
  buttonCloseContent?: string;
  buttonCreateContent?: string;
  modalTitle: string;
  children: React.ReactNode;
  onButtonCreate?: () => Promise<void>;
  onButtonClose?: () => Promise<void>;
}

const CreateWrapper: React.FC<CreateWrapperProps> = ({
  buttonContent,
  modalTitle,
  buttonCloseContent,
  buttonCreateContent,
  children,
  onButtonCreate,
  onButtonClose,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div>
        <Button className="bg-gray-200" onPress={onOpen}>
          {buttonContent}
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalTitle}
                </ModalHeader>
                <ModalBody>
                  <div>{children}</div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={async () => {
                      await onButtonClose?.();
                      onClose();
                    }}
                  >
                    {buttonCloseContent || "Đóng"}
                  </Button>
                  <Button
                    color="primary"
                    className="rounded-lg"
                    onPress={async () => {
                      await onButtonCreate?.();
                      onClose();
                    }}
                    variant="light"
                  >
                    {buttonCreateContent || "Tạo"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CreateWrapper;
