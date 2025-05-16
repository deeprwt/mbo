import { apiClient } from "./axiosConfig";
import type {
  AuthTokens,
  AuthUser,
  ApiResponse,
  LoginResponse as LoginResponseData,
  RefreshTokenResponse as RefreshTokenResponseData,
} from "@/types/auth";
import { API_ENDPOINTS } from "@/constants/api";

// Local type aliases for full API responses
type LoginApiResponse = ApiResponse<LoginResponseData>;
type RefreshTokenApiResponse = ApiResponse<RefreshTokenResponseData>;
type RegisterApiResponse = ApiResponse<AuthUser>;

export const loginApi = async (
  email: string,
  password: string
): Promise<{ user: AuthUser; tokens: AuthTokens }> => {
  console.log("Attempting login with:", {
    email,
    url: API_ENDPOINTS.AUTH.LOGIN,
  });

  try {
    const response = await apiClient.post<LoginApiResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        email,
        password,
      }
    );

    console.log("Login response status:", response.status);

    const { accessToken, user } = response.data.data;

    // For the frontend, we only care about the access token
    // The refresh token is stored in an HTTP-only cookie by the server
    const tokens: AuthTokens = {
      accessToken,
      refreshToken: "", // Not storing this in memory/localStorage for security
    };

    return {
      user,
      tokens,
    };
  } catch (error) {
    console.error("Login API error details:", error);
    throw error;
  }
};

export const refreshTokenApi = async (): Promise<{ accessToken: string }> => {
  console.log(
    "Refreshing token with endpoint:",
    API_ENDPOINTS.AUTH.REFRESH_TOKEN
  );

  try {
    // Don't send anything in the body - refresh token is in the HTTP-only cookie
    const response = await apiClient.post<RefreshTokenApiResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      {} // Empty request body
    );

    console.log("Token refresh successful");

    // Return just the new access token
    return {
      accessToken: response.data.data.accessToken,
    };
  } catch (error) {
    console.error("Token refresh API error:", error);
    throw error;
  }
};

export const logoutApi = async (): Promise<void> => {
  try {
    // This will clear the HTTP-only cookie on the server
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    console.log("Logout API called successfully");
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  roleName: string,
  dealershipId: string,
  outletId?: string
): Promise<AuthUser> => {
  const response = await apiClient.post<RegisterApiResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    {
      name,
      email,
      password,
      roleName,
      dealershipId,
      outletId,
    }
  );

  return response.data.data;
};
