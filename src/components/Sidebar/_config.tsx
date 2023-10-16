import { appLinks } from "@/config/app.config";
import {
  ACCOUNT_PATH,
  DEPARTMENT_PATH,
  FORM_PATH,
  HOME_PATH,
  PROPERTY_PATH,
} from "@/constants/paths";
import {
  HiClipboardDocumentCheck,
  HiClipboardDocumentList,
  HiOutlineBuildingLibrary,
  HiOutlineIdentification,
  HiOutlinePuzzlePiece,
  HiOutlineSquaresPlus,
} from "react-icons/hi2";

export type SidebarItem = {
  title: string;
  icon?: JSX.Element;
  href: string;
};

export type SidebarConfig = {
  title: string;
  icon?: JSX.Element;
  href?: string;
  items?: SidebarItem[];
};

export const SidebarAdminConfig: SidebarConfig[] = [
  {
    title: "Bảng điều khiển",
    icon: <HiOutlineSquaresPlus size="24" />,
    href: HOME_PATH,
  },
  {
    title: "Quản lý tài khoản",
    icon: <HiOutlineIdentification size="24" />,
    items: [
      {
        title: "Tài khoản",
        href: ACCOUNT_PATH,
      },
      {
        title: "Tạo tài khoản",
        href: ACCOUNT_PATH + "/new",
      },
    ],
  },
  {
    title: "Quản lý phòng ban",
    icon: <HiOutlineBuildingLibrary size="24" />,
    items: [
      {
        title: "Phòng ban",
        href: DEPARTMENT_PATH,
      },
      {
        title: "Tạo phòng ban",
        href: DEPARTMENT_PATH + "/new",
      },
    ],
  },
  {
    title: "Quản lý thuộc tính",
    icon: <HiOutlinePuzzlePiece size="24" />,
    items: [
      {
        title: "Thuộc tính",
        href: PROPERTY_PATH,
      },
      {
        title: "Tạo thuộc tính",
        href: PROPERTY_PATH + "/new",
      },
    ],
  },
  {
    title: "Quản lý mẫu đơn",
    icon: <HiClipboardDocumentList size="24" />,
    items: [
      {
        title: "Mẫu đơn",
        href: FORM_PATH,
      },
      {
        title: "Tạo mẫu đơn",
        href: FORM_PATH + "/new",
      },
    ],
  },
  {
    title: "Phản hồi mẫu đơn",
    icon: <HiClipboardDocumentCheck size="24" />,
    items: [
      {
        title: "Tất cả",
        href: FORM_PATH + "/responses",
      },
    ],
  },
];

export const SidebarManagerConfig = [
  {
    title: "Bảng điều khiển",
    icon: <HiOutlineSquaresPlus size="24" />,
    href: appLinks.home,
  },
  {
    title: "Phản hồi mẫu đơn",
    icon: <HiClipboardDocumentCheck size="24" />,
    items: [
      {
        title: "Mẫu đơn đang chờ xử lý",
        href: FORM_PATH + "/responses/processings",
      },
      {
        title: "Mẫu đơn đã xử lý",
        href: FORM_PATH + "/responses/processed",
      },
      {
        title: "Mẫu đơn đã từ chối",
        href: FORM_PATH + "/responses/rejected",
      },
    ],
  },
];
