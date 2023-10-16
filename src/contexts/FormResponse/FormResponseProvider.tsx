"use client";

import FormResponseDetail from "@/components/FormResponses/FormResponseDetail";
import FormResponseTabAction from "@/components/FormResponses/FormResponseTabAction";
import { getFormResponseDetail } from "@/services/form-response.service";
import { useAuthStore } from "@/stores/use-auth-store";
import { IDepartment, IFormResponseDetail, Role } from "@/types/all";
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
import React, { PropsWithChildren } from "react";

interface FormResponseContextProps {
  isOpen: boolean;
  handleOpen: (formResponseId: string) => void;
  handleClose: () => void;
  data: IFormResponseDetail | undefined;
  nextProcess:
    | {
        step_number: number;
        time_limit: number;
        department: IDepartment;
      }
    | null
    | undefined;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialContextState: FormResponseContextProps = {
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
  data: undefined,
  nextProcess: undefined,
  isLoading: false,
  isSuccess: false,
};

type Tab = "viewer" | "handler";

export const FormResponseContext =
  React.createContext<FormResponseContextProps>(initialContextState);

export const FormResponseProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuthStore();

  const [formResponseId, setformResponseId] = React.useState<
    string | undefined
  >();

  const [tab, setTab] = React.useState<React.Key>("viewer");

  const handleOpen = React.useCallback(
    (formResponseId: string) => {
      setformResponseId(formResponseId);

      onOpen();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClose = React.useCallback(() => {
    setformResponseId(undefined);

    setTab("viewer");

    onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: formResponseDetail,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["form_response_detail", formResponseId],
    queryFn: () => getFormResponseDetail(formResponseId || ""),
    enabled: !!formResponseId,
    keepPreviousData: true,
    onSuccess: (data) => {
      const tab =
        user?.role === Role.MANAGER &&
        user?.department_id === data?.data?.current_department_id
          ? "handler"
          : "viewer";

      setTab(tab);
    },
    staleTime: 0,
  });

  const getNextProcess = React.useMemo(() => {
    const lastProcess = formResponseDetail?.data?.processes?.slice(-1)[0];

    if (!lastProcess) return null;

    const nextProcess = formResponseDetail?.data?.form?.processing_steps?.find(
      (i) =>
        i?.step_number === lastProcess?.form_processing_step?.step_number + 1
    );

    return nextProcess;
  }, [formResponseDetail]);

  return (
    <FormResponseContext.Provider
      value={{
        isOpen,
        handleOpen,
        handleClose,
        data: formResponseDetail?.data,
        nextProcess: getNextProcess,
        isLoading: isFetching,
        isSuccess,
      }}
    >
      <>
        <Modal
          size="5xl"
          isOpen={isOpen}
          scrollBehavior="inside"
          hideCloseButton
        >
          <ModalContent>
            <ModalHeader className="flex items-center justify-center">
              {isFetching && <h2>Đang tải...</h2>}
              {isSuccess && (
                <h2 className="text-black font-bold">
                  {formResponseDetail.data?.form.name.toLocaleUpperCase()}
                </h2>
              )}
            </ModalHeader>
            <ModalBody>
              <FormResponseTabAction tab={tab} setTab={setTab}>
                <FormResponseDetail />
              </FormResponseTabAction>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" variant="flat" onPress={handleClose}>
                Đóng
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      {children}
    </FormResponseContext.Provider>
  );
};

export const useFormResponseContext = (): FormResponseContextProps => {
  const {
    handleClose,
    handleOpen,
    isOpen,
    data,
    isLoading,
    isSuccess,
    nextProcess,
  } = React.useContext(FormResponseContext);

  return {
    handleClose,
    handleOpen,
    isOpen,
    data,
    nextProcess,
    isLoading,
    isSuccess,
  };
};
