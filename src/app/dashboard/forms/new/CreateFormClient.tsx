"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FormPropertiesDnd from "@/components/DragAndDrop/FormPropertiesDnd";
import FormGroup from "@/components/Form/FormGroup";
import FormContentWrapper from "@/components/Forms/FormContentWrapper";
import FormStepControl from "@/components/Forms/FormStepControl";
import { schema } from "@/components/Forms/schema";
import Hint from "@/components/Hint/Hint";
import Input from "@/components/Input/Input";
import InputControl from "@/components/Input/InputControl";
import SelectControl from "@/components/Input/SelectControl";
import Center from "@/components/Layout/Center";
import Container from "@/components/Layout/Container";
import { FORM_PATH } from "@/constants/paths";
import useDepartments from "@/hooks/api/use-department";
import useAuth from "@/hooks/use-auth";
import {
  IBaseStep,
  ICreateFormProperty,
  createForm,
} from "@/services/form.service";
import { IForm, Role } from "@/types/all";
import { EFormStatus } from "@/types/enums";
import { Response } from "@/types/response";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface IBaseCreateForm {
  name: string;
  description: string;
  status: string;
  processing_time: number;
  processing_steps: IBaseStep[] | undefined;
  properties: ICreateFormProperty[] | undefined;
}

const CreateFormClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<IBaseCreateForm>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      status: "",
      processing_time: 3,
      processing_steps: [],
      properties: [],
    },
    resolver: yupResolver(schema) as any,
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "processing_steps",
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
    move: moveProperty,
  } = useFieldArray({
    control,
    name: "properties",
  });

  const { departments } = useDepartments();

  const selectedSteps = watch("processing_steps");

  const filteredDepartments = React.useMemo(() => {
    const lastSelectedStep = selectedSteps?.[selectedSteps.length - 2];

    return departments?.filter((d) => d.id !== lastSelectedStep?.department_id);
  }, [departments, selectedSteps]);

  React.useEffect(() => {
    appendStep({
      department_id: "",
      time_limit: 1,
    });
    appendProperty({
      property_id: "",
      is_required: true,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: IBaseCreateForm) => createForm(data),
    onError: (response: Response<IForm>) => {
      toast.error(response?.message || "Đã có lỗi xảy ra!");
    },
    onSuccess: (response: Response<IForm>) => {
      toast.success(response?.message || "Tạo mẫu đơn thành công!");

      queryClient.invalidateQueries({
        exact: false,
        predicate: (query) => query.queryKey[0] === "forms",
      });

      router.push(FORM_PATH);
    },
  });

  const handleDragEnd = React.useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;

      moveProperty(source.index, destination.index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <Breadcrumb title="Tạo mẫu đơn" backTo={FORM_PATH} />
      <Container>
        <div className="space-y-2">
          <FormGroup>
            <InputControl
              name="name"
              control={control}
              label="Tên mẫu đơn"
              placeholder="Nhập vào tên mẫu đơn"
              error={Boolean(errors.name)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
            <Hint>
              Tên mẫu đơn ngắn gọn, dễ hiểu, dễ nhớ, không quá 255 ký tự
            </Hint>
          </FormGroup>
          <FormGroup>
            <InputControl
              name="description"
              control={control}
              label="Mô tả"
              placeholder="Nhập vào mô tả"
              error={Boolean(errors.description)}
              fullWidth
              spellCheck={false}
              component={<Input />}
            />
            <Hint>
              Mô tả chi tiết về mẫu đơn để người dùng có thể hiểu rõ hơn, thêm
              một số chú ý nếu cần thiết
            </Hint>
          </FormGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup>
              <InputControl
                name="status"
                control={control}
                label="Trạng thái"
                placeholder="Chọn trạng thái"
                error={Boolean(errors.status)}
                fullWidth
                spellCheck={false}
                component={
                  <SelectControl
                    options={[
                      {
                        id: "1",
                        label: "Bản nháp",
                        value: EFormStatus.DRAFT,
                      },
                      {
                        id: "2",
                        label: "Xuất bản",
                        value: EFormStatus.PUBLISHED,
                      },
                      {
                        id: "3",
                        label: "Lưu trữ",
                        value: EFormStatus.ARCHIVED,
                      },
                    ]}
                  />
                }
              />
              <Hint>Ví dụ: Xuất bản, Lưu trữ...</Hint>
            </FormGroup>
            <FormGroup>
              <InputControl
                name="processing_time"
                control={control}
                label="Thời gian xử lý dự kiến (ngày)"
                placeholder="Nhập vào thời gian xử lý"
                error={Boolean(errors.processing_time)}
                fullWidth
                spellCheck={false}
                type="number"
                min={1}
                max={10}
                component={<Input />}
              />
              <Hint>Dự kiến về thời gian sẽ hoàn thành quá trình xử lý</Hint>
            </FormGroup>
          </div>

          <div>
            <FormContentWrapper title="Lựa chọn các bước trong quá trình xử lý">
              <div>
                {stepFields &&
                  stepFields.map((item, index) => (
                    <FormStepControl
                      control={control}
                      errors={errors}
                      key={item.id}
                      index={index}
                      isLast={index === stepFields.length - 1}
                      filteredDepartments={filteredDepartments}
                      onRemoveStep={removeStep}
                      canRemove={index !== 0 && stepFields.length > 1}
                    />
                  ))}
              </div>
              <div>
                <div className="flex items-center justify-center mt-4">
                  <Button
                    onPress={() =>
                      appendStep({
                        department_id: "",
                        time_limit: 1,
                      })
                    }
                    variant="bordered"
                    size="sm"
                  >
                    Thêm phòng ban
                  </Button>
                </div>
              </div>
            </FormContentWrapper>
            <Hint>
              Hãy chọn các phòng ban mà mẫu đơn sẽ được gửi đến trong quá trình
              xử lý, mỗi bước sẽ được gửi đến một phòng ban cụ thể, với thời
              gian xử lý dự kiến.
            </Hint>
          </div>

          <div>
            <FormContentWrapper title="Thêm nội dung của mẫu đơn">
              <div className="rounded-md space-y-4">
                <FormPropertiesDnd
                  fields={propertyFields}
                  errors={errors}
                  control={control}
                  handleDragEnd={handleDragEnd}
                  removeProperty={removeProperty}
                  setValue={setValue}
                />
              </div>
              <div>
                <div className="flex items-center justify-center mt-4">
                  <Button
                    onPress={() =>
                      appendProperty({
                        property_id: "",
                        is_required: true,
                      })
                    }
                    variant="bordered"
                    size="sm"
                  >
                    Thêm trường thông tin
                  </Button>
                </div>
              </div>
            </FormContentWrapper>
            <Hint>
              Nội dung của mẫu đơn là các trường thông tin mà người dùng cần
              phải điền vào, lựa chọn... để hoàn thành mẫu đơn. Bạn có thể thêm
              các trường thông tin bằng cách chọn các trường thông tin có sẵn
              hoặc tạo trường thông tin mới. Bạn có thể sắp xếp lại các trường
              bằng cách kéo thả chúng.
            </Hint>
          </div>
          <div className="my-2 md:my-4">
            <Center>
              <Button
                onPress={handleSubmit((data) => mutation.mutate(data)) as any}
                isLoading={mutation.isLoading}
              >
                <span className="text-sm">Tạo mẫu đơn</span>
              </Button>
            </Center>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateFormClient;
