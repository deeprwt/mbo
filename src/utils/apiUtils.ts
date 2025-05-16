import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "@/apis/axiosConfig";

/**
 * Makes an authenticated API request using apiClient, which handles token refresh.
 * @param config The Axios request configuration
 * @returns A promise that resolves to the API response
 */
export const makeAuthenticatedRequest = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const method = config.method?.toLowerCase() || "get";
  if (method === "get") {
    return await apiClient.get(config.url!, config);
  } else if (method === "post") {
    return await apiClient.post(config.url!, config.data, config);
  } else if (method === "put") {
    return await apiClient.put(config.url!, config.data, config);
  } else if (method === "delete") {
    return await apiClient.delete(config.url!, config);
  } else if (method === "patch") {
    return await apiClient.patch(config.url!, config.data, config);
  } else {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }
};

/**
 * Hook for making authenticated API requests in React components
 *
 * This hook provides methods for making authenticated API requests
 * with automatic token refresh handling (handled by apiClient).
 *
 * @returns Object with methods for making API requests
 */
export const useAuthenticatedApi = () => {
  const request = async <T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const method = config.method?.toLowerCase() || "get";
    if (method === "get") {
      return await apiClient.get(config.url!, config);
    } else if (method === "post") {
      return await apiClient.post(config.url!, config.data, config);
    } else if (method === "put") {
      return await apiClient.put(config.url!, config.data, config);
    } else if (method === "delete") {
      return await apiClient.delete(config.url!, config);
    } else if (method === "patch") {
      return await apiClient.patch(config.url!, config.data, config);
    } else {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }
  };

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: "GET", url }),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: "POST", url, data }),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: "PUT", url, data }),
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: "PATCH", url, data }),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: "DELETE", url }),
  };
};
