import { AxiosRequestConfig } from 'axios';
import axiosClient from './axios-client';
import { IApiResponse } from './interfaces';

export type TQueryParams = Record<
  string,
  string | number | string[] | number[]
>;

const generateUrlWithQueryParams = (
  url: string,
  queryParams?: TQueryParams,
): string => {
  if (!queryParams) {
    return url;
  }

  const queryParamsArray = Object.entries(queryParams).map(([key, value]) => {
    if (Array.isArray(value)) {
      return value
        .map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
        .join('&');
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  });

  return `${url}?${queryParamsArray.join('&')}`;
};

export const axiosGet = async <T>(
  url: string,
  config: AxiosRequestConfig,
  queryParams?: TQueryParams,
): Promise<IApiResponse<T>> => {
  const reqUrl = generateUrlWithQueryParams(url, queryParams);
  const response = await axiosClient.get(reqUrl, config);
  return response.data;
};
