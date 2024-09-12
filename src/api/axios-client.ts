import axios, { CreateAxiosDefaults } from 'axios';

// Default configuration
const config: CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJzdWIiOjEsImlhdCI6MTcyNjA0NjI4MCwiZXhwIjoxNzI2NDc4MjgwfQ.WQCPgPRfACHqJkonHebgoQLDCS1MwzYQOp9borwwOPU',
  },
};

// Create axios instance
const axiosClient = axios.create(config);

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // You can add custom logic here, e.g., adding authentication tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // You can add custom logic here for successful responses
    return response;
  },
  (error) => {
    // You can add custom error handling logic here
    return Promise.reject(error);
  },
);

export default axiosClient;

// Optional: Export a function to create new instances with custom configs
export const createCustomAxiosClient = (customConfig: CreateAxiosDefaults) => {
  return axios.create({ ...config, ...customConfig });
};
