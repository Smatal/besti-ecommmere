export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  timestamp: string;
}

export function apiSuccess<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function apiError(error: string, code?: string): ApiResponse<never> {
  return {
    success: false,
    error,
    code,
    timestamp: new Date().toISOString(),
  };
}

