export interface Response<T> {
  code: number;
  data?: T;
  message?: string;
  errors?: ErrorResponse;
  success: boolean;
  path: string;
  timestamp: Date;
}

export interface ErrorResponse {
  type: string;
  error_code: number;
  message: string;
}
