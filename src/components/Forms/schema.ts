import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên mẫu đơn không được để trống")
    .min(3, "Tên mẫu đơn phải có ít nhất 3 ký tự")
    .max(255, "Tên mẫu đơn không được quá 255 ký tự"),
  description: yup
    .string()
    .required("Mô tả không được để trống")
    .min(3, "Mô tả phải có ít nhất 3 ký tự")
    .max(255, "Mô tả không được quá 255 ký tự"),
  status: yup.string().required("Trạng thái không được để trống"),
  processing_time: yup
    .number()
    .required("Thời gian xử lý không được để trống")
    .min(1, "Thời gian xử lý phải lớn hơn 0")
    .max(10, "Thời gian xử lý không được lớn hơn 10")
    .integer("Thời gian xử lý phải là số nguyên")
    .typeError("Thời gian xử lý phải là số nguyên" as any),
  processing_steps: yup.array().of(
    yup
      .object()
      .shape({
        department_id: yup.string().required("Không được để trống"),
        time_limit: yup
          .number()
          .required("Thời gian xử lý không được để trống")
          .min(1, "Thời gian xử lý phải lớn hơn 0")
          .max(10, "Thời gian xử lý không được lớn hơn 10")
          .integer("Thời gian xử lý phải là số nguyên")
          .typeError("Thời gian xử lý phải là số nguyên" as any),
      })
      .required()
  ),
  properties: yup.array().of(
    yup.object().shape({
      property_id: yup.string().required("Không được để trống"),
      is_required: yup.boolean().required("Không được để trống").default(false),
      // default_value: yup.string().nullable().optional(),
      // max_length: yup.number().nullable().integer().optional(),
      // min_length: yup.number().nullable().integer().optional(),
    })
  ),
});
