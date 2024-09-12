import { AxiosRequestConfig } from 'axios';
import axiosClient from './axios-client';
import { IApiResponse } from './interfaces';

export const axiosGet = async <T>(
  url: string,
  config: AxiosRequestConfig,
): Promise<IApiResponse<T>> => {
  const response = await axiosClient.get(url, config);
  return response.data;
};
