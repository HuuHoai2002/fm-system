"use client";

import { getFixturePropertyType } from "@/lib/utils";
import { getAllProperties } from "@/services/property.service";
import { IProperty } from "@/types/all";
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

interface FormPropertyContextProps {
  isOpen: boolean;
  handleOpen: (uuid: string) => void;
  handleClose: () => void;
  handleRemoveProperty: (uuid: string) => void;
  getSelectedProperty: (uuid: string) => SelectedProperty | undefined;
}

type SelectedProperty = {
  uuid: string | undefined;
  property: IProperty | undefined;
};

const initialContextState: FormPropertyContextProps = {
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
  handleRemoveProperty: () => {},
  getSelectedProperty: () => undefined,
};

export const FormPropertyContext =
  React.createContext<FormPropertyContextProps>(initialContextState);

export const FormPropertyProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedList, setSelectedList] = React.useState<SelectedProperty[]>(
    []
  );

  const [selected, setSelected] = React.useState<{
    uuid: string;
    property: IProperty | undefined;
  }>();

  const disabledList = React.useMemo(() => {
    return selectedList
      .filter((p) => p?.uuid !== selected?.uuid)
      ?.map((p) => p?.property)
      ?.map((p) => p?.id);
  }, [selected, selectedList]);

  const handleAddProperty = React.useCallback(
    (property: IProperty) => {
      const isSelected = selectedList.some(
        (p) => p?.property?.id === property.id
      );

      if (isSelected) {
        return;
      }

      const _selectedPropertyList = selectedList.filter(
        (p) => p?.uuid !== selected?.uuid
      );

      _selectedPropertyList.push({
        uuid: selected?.uuid,
        property,
      });

      setSelectedList(_selectedPropertyList);
    },
    [selected, selectedList]
  );

  const handleRemoveProperty = React.useCallback((uuid: string) => {
    setSelectedList((p) => p.filter((i) => i?.uuid !== uuid));
  }, []);

  const isSelected = React.useCallback(
    (property: IProperty) => {
      return selectedList.some((p) => p?.property?.id === property.id);
    },
    [selectedList]
  );

  const handleOpen = React.useCallback(
    (uuid: string) => {
      const _selected = selectedList.find((p) => p?.uuid === uuid);

      setSelected({
        uuid,
        property: _selected?.property,
      });

      onOpen();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClose = React.useCallback(() => {
    setSelected(undefined);
    onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSelectedProperty = React.useCallback(
    (uuid: string) => {
      return selectedList.find((p) => p.uuid === uuid);
    },
    [selectedList]
  );

  const { data } = useQuery({
    queryKey: ["form_property_provider"],
    queryFn: () => getAllProperties(""),
    keepPreviousData: true,
  });

  return (
    <FormPropertyContext.Provider
      value={{
        isOpen,
        handleOpen,
        handleClose,
        handleRemoveProperty,
        getSelectedProperty,
      }}
    >
      <>
        <Modal
          size="3xl"
          isOpen={isOpen}
          scrollBehavior="inside"
          hideCloseButton
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chọn Thuộc Tính
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data &&
                    data?.data?.results?.map((property: IProperty) => (
                      <div className="" key={property.id}>
                        <div
                          className={classNames(
                            "p-4 border border-gray-200 !select-none rounded-md transition-all cursor-pointer",
                            {
                              "bg-blue-100 !border-blue-500":
                                isSelected(property),
                              "opacity-50  !cursor-not-allowed":
                                disabledList?.includes(property?.id),
                            }
                          )}
                          onClick={() => handleAddProperty(property)}
                        >
                          <div
                            className={classNames(
                              "text-xs font-medium text-blue-500"
                            )}
                          >
                            {
                              getFixturePropertyType(property?.property_type)
                                ?.label
                            }
                          </div>
                          <span className="font-medium text-black">
                            {property.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Đóng
                </Button>
                <Button color="primary" onPress={handleClose}>
                  Chọn
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
      {children}
    </FormPropertyContext.Provider>
  );
};

export const useFormProperty = (): FormPropertyContextProps => {
  const {
    getSelectedProperty,
    handleClose,
    handleOpen,
    handleRemoveProperty,
    isOpen,
  } = React.useContext(FormPropertyContext);

  return {
    getSelectedProperty,
    handleClose,
    handleOpen,
    handleRemoveProperty,
    isOpen,
  };
};
