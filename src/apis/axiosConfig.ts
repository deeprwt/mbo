import axios, { AxiosError } from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig & { _retry?: boolean };
}

let isLoggedOut = false;

class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequestQueueItem[] = [];
  public accessToken: string | null = null; // in-memory

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(this.attachToken);
    this.instance.interceptors.response.use(
      (res) => res,
      this.handleResponseError
    );
  }

  // Attach current access token to outgoing requests
  private attachToken = (config: InternalAxiosRequestConfig) => {
    if (isLoggedOut) {
      return Promise.reject(new Error("User is logged out"));
    }
    if (this.accessToken) {
      if (config.headers) {
        (config.headers as AxiosRequestHeaders)[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;
      }
    }
    return config;
  };

  // On 401, queue requests while a refresh is in flight, then retry
  private handleResponseError = async (err: AxiosError) => {
    if (isLoggedOut) {
      return Promise.reject(err);
    }
    const originalReq = err.config! as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    console.log("Error response:", err.response?.status, err.response?.data);
    console.log("Original request:", originalReq.url);

    if (err.response?.status === 401 && !originalReq._retry) {
      console.log("Attempting to refresh token...");

      if (this.isRefreshing) {
        console.log("Refresh already in progress, queueing request");
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject, config: originalReq });
        });
      }

      originalReq._retry = true;
      this.isRefreshing = true;

      try {
        console.log("Calling refresh token endpoint...");
        // First, check the response format by console logging
        const response = await this.instance.post("/auth/refresh-token");
        console.log("Refresh token response full:", response);

        // Try to access the token based on the actual response structure
        let newToken;
        if (response.data?.data?.accessToken) {
          newToken = response.data.data.accessToken;
        } else if (response.data?.accessToken) {
          newToken = response.data.accessToken;
        } else {
          console.error(
            "Unable to find access token in response:",
            response.data
          );
          throw new Error("Invalid token response format");
        }

        console.log("New access token received:", newToken);
        this.accessToken = newToken;

        // Update localStorage for consistency with AuthContext
        try {
          const storedTokens = JSON.parse(
            localStorage.getItem("auth_tokens") || "{}"
          );
          storedTokens.accessToken = newToken;
          localStorage.setItem("auth_tokens", JSON.stringify(storedTokens));
          console.log("Updated access token in localStorage");
        } catch (storageError) {
          console.error("Failed to update localStorage:", storageError);
          // Continue anyway since in-memory token is set
        }

        isLoggedOut = false;

        // retry all queued requests with the new token
        this.failedQueue.forEach(({ resolve, config }) => {
          if (config.headers) {
            (config.headers as AxiosRequestHeaders)[
              "Authorization"
            ] = `Bearer ${this.accessToken}`;
          }
          resolve(this.instance.request(config));
        });
        this.failedQueue = [];

        // retry the original request with the new token
        if (originalReq.headers) {
          (originalReq.headers as AxiosRequestHeaders)[
            "Authorization"
          ] = `Bearer ${this.accessToken}`;
        }
        return this.instance.request(originalReq);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        this.failedQueue.forEach(({ reject }) => reject(refreshError));
        this.failedQueue = [];
        isLoggedOut = true;
        // Don't call AuthService.logout() or window.location here
        // Just set the flag and let the AuthContext handle the actual logout
        return Promise.reject(refreshError);
      } finally {
        this.isRefreshing = false;
      }
    }

    return Promise.reject(err);
  };

  // Expose HTTP methods
  get<T>(url: string, config = {}) {
    return this.instance.get<T>(url, config);
  }
  post<T>(url: string, data?: unknown, config = {}) {
    return this.instance.post<T>(url, data, config);
  }
  put<T>(url: string, data?: unknown, config = {}) {
    return this.instance.put<T>(url, data, config);
  }
  delete<T>(url: string, config = {}) {
    return this.instance.delete<T>(url, config);
  }
  patch<T>(url: string, data?: unknown, config = {}) {
    return this.instance.patch<T>(url, data, config);
  }

  // Reset the logged out flag (call on login)
  resetLoggedOutFlag() {
    isLoggedOut = false;
  }

  // Set logged out flag (call on logout)
  setLoggedOutFlag() {
    isLoggedOut = true;
  }

  // Check if logged out (useful for components to check before fetching)
  isLoggedOut() {
    return isLoggedOut;
  }
}

export const apiClient = new HttpClient();
