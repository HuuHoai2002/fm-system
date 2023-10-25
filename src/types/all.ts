import {
  EFormResponseStatus,
  EFormStatus,
  ENotificationFrom,
  ENotificationTo,
  PropertyType,
} from "./enums";

export interface Token {
  access_token: string;
  refresh_token: string;
}

export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}
export interface IDepartment {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  department_id?: string;
  department?: IDepartment;
  address?: string;
  phone?: string;
  avatar?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  token: Token;
}

export interface IVerifyAuth {
  is_logged_in: boolean;
  user_id: string;
  email: string;
  department_id: string;
  role: Role;
}

export interface IReportStatistical {
  reports: Reports;
  report_type: string;
  report_time: ReportTime;
}

export interface Reports {
  users: number;
  departments: number;
  properties: number;
  forms: number;
  form_responses: number;
}

export interface ReportTime {
  start_date: string;
  end_date: string;
}

export interface IPropertyOption {
  id: string;
  label: string;
  value: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  property_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IProperty {
  id: string;
  name: string;
  description: string;
  property_type: PropertyType;
  is_active: boolean;
  is_deleted: boolean;
  is_multiple: boolean;
  options: IPropertyOption[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IForm {
  id: string;
  name: string;
  description: string;
  status: EFormStatus;
  is_active: boolean;
  is_deleted: boolean;
  department_id: string;
  department: IDepartment;
  processing_time: number;
  one_step: boolean;
  creator_id: string;
  created_at: string;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IFormDetail {
  id: string;
  name: string;
  description: string;
  status: string;
  is_active: boolean;
  is_deleted: boolean;
  department_id: string;
  processing_time: number;
  one_step: boolean;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  department: IDepartment;
  processing_steps: IStep[];
}

export interface IStep {
  id: string;
  form_id: string;
  department_id: string;
  department: IDepartment;
  step_number: number;
  time_limit: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ISender {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IReceiver {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IFormResponse {
  id: string;
  code: string;
  form_id: string;
  account_id: string;
  status: EFormResponseStatus;
  is_deleted: boolean;
  is_processed: boolean;
  current_department_id?: string;
  current_department?: IDepartment;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  account: {
    id: string;
    email: string;
    full_name: string;
    role: string;
  };
  form: {
    id: string;
    name: string;
    description: string;
  };
}

export interface IFormProperty {
  index: number;
  is_required: boolean;
  property: IProperty;
}

export interface IResponseProperty {
  value?: string;
  form_property: IFormProperty;
  selected_property_options: IPropertyOption[];
}

export interface IHandlingOfficer {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone: any;
}

export interface IResponseProcess {
  id: string;
  form_response_id: string;
  form_processing_step_id: string;
  form_processing_step: IStep;
  handling_officer_id?: string;
  status: EFormResponseStatus;
  is_rejected: boolean;
  is_completed: boolean;
  rejected_reason?: string;
  created_at: Date;
  received_at?: Date;
  rejected_at?: Date;
  completed_at?: Date;
  updated_at: Date;
  deleted_at?: Date;
  handling_officer?: IHandlingOfficer;
}

export interface IFormResponseDetail {
  id: string;
  code: string;
  form_id: string;
  account_id: string;
  status: EFormResponseStatus;
  is_deleted: boolean;
  is_processed: boolean;
  current_department_id?: string;
  current_department?: IDepartment;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  account: {
    id: string;
    email: string;
    full_name: string;
    role: Role;
    phone?: string;
  };
  form: {
    id: string;
    name: string;
    description: string;
    status: string;
    is_active: boolean;
    is_deleted: boolean;
    department_id: string;
    processing_time: number;
    one_step: boolean;
    creator_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    department: IDepartment;
    processing_steps: {
      step_number: number;
      time_limit: number;
      department: IDepartment;
    }[];
  };
  response_properties: IResponseProperty[];
  processes: IResponseProcess[];
}

export interface INotification {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  from: ENotificationFrom;
  to: ENotificationTo;
  form_response_id?: string;
  receiver_id?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
