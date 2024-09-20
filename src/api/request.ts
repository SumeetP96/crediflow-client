import { AxiosRequestConfig } from 'axios';
import axiosClient from './axios-client';
import { IApiResponse } from './types';

export type TQueryParams = Record<
  string,
  string | number | string[] | number[] | Array<string | number> | Record<string, string | number>
>;

const generateUrlWithQueryParams = (url: string, queryParams?: TQueryParams): string => {
  if (!queryParams) {
    return url;
  }

  const queryParamsArray = Object.entries(queryParams).map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`).join('&');
    }
    if (!Array.isArray(value) && typeof value === 'object') {
      return Object.entries(value)
        .map(
          ([subKey, subValue]) =>
            `${encodeURIComponent(key)}[${encodeURIComponent(subKey)}]=${encodeURIComponent(
              subValue,
            )}`,
        )
        .join('&');
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
  });

  return `${url}?${queryParamsArray.join('&')}`;
};

export const axiosGet = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  queryParams?: TQueryParams,
): Promise<IApiResponse<T>> => {
  const reqUrl = generateUrlWithQueryParams(url, queryParams);
  const response = await axiosClient.get(reqUrl, config);
  return response.data;
};

export const axiosPost = async <T, I>(
  url: string,
  data?: I | Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<IApiResponse<T>> => {
  const response = await axiosClient.post(url, data, config);
  return response.data;
};

export const axiosPatch = async <T, I>(
  url: string,
  data?: I | Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<IApiResponse<T>> => {
  const response = await axiosClient.patch(url, data, config);
  return response.data;
};
