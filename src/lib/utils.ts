import { PropertyType } from "@/types/enums";

export const FixturePropertyType = [
  {
    label: "Chuỗi ký tự (text)",
    value: PropertyType.TEXT,
  },
  {
    label: "Chọn một (radio)",
    value: PropertyType.RADIO,
  },
  {
    label: "Chọn nhiều (checkbox)",
    value: PropertyType.CHECKBOX,
  },
  {
    label: "Chọn một (select)",
    value: PropertyType.SELECT,
  },
  {
    label: "Ngày giờ (datetime)",
    value: PropertyType.DATETIME,
  },
  {
    label: "Khoảng giá trị (range)",
    value: PropertyType.RANGE,
  },
];

export const getFixturePropertyType = (value: PropertyType) => {
  return FixturePropertyType.find((item) => item.value === value);
};
