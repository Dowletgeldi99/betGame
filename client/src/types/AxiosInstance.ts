import type { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosPromise<T = any> = Promise<T>

export interface IAxiosInstance {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request: <T = any>(config: AxiosRequestConfig) => AxiosPromise<T>;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  delete: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>;
  head: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>;
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>;

  (config: AxiosRequestConfig): AxiosPromise;

  (url: string, config?: AxiosRequestConfig): AxiosPromise;
}

export interface SuccessResponse<T> {
  rows: T
  count: number
}
