import { AxiosResponse, InternalAxiosRequestConfig, isAxiosError } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: number; endTime?: number };
}

export type CustomAxiosResponse<T = any> = AxiosResponse<T> & {
  config: CustomAxiosRequestConfig;
  duration?: number;
};

export const countDuration = (startTime: number | undefined): number => {
  const endTime = Date.now();
  const duration = endTime - (startTime || endTime);
  return duration;
};

export const extendConfig = (config: CustomAxiosRequestConfig) => {
  config.metadata = { startTime: Date.now() };
  return config;
};

export const extendResponse = (response: CustomAxiosResponse) => {
  const { startTime } = response?.config?.metadata || {};
  response.duration = countDuration(startTime);
  return response;
};

export const extendErrorResponse = (error: unknown) => {
  if (!isAxiosError(error)) return Promise.reject(error);
  if (!error.response?.config) return Promise.reject(error);
  error.response = extendResponse(error.response);
  return Promise.reject(error);
};
