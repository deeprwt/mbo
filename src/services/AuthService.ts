import {
  loginApi,
  refreshTokenApi,
  logoutApi,
  registerApi,
} from "@/apis/authApi";
import type { AuthTokens, AuthUser } from "@/types/auth";

// Local storage keys
const AUTH_TOKENS_KEY = "auth_tokens";
const AUTH_USER_KEY = "auth_user";

export const AuthService = {
  /**
   * Log in a user and store their tokens and user info in localStorage
   */
  async login(
    email: string,
    password: string
  ): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const { user, tokens } = await loginApi(email, password);

    // Store auth data in localStorage
    // Note: The refresh token is also stored in an HTTP-only cookie by the server
    // We only store the access token and user data for frontend usage
    const tokenData = {
      accessToken: tokens.accessToken,
      // We don't store the actual refresh token in localStorage for security
      // It's managed via HTTP-only cookie by the server
      refreshToken: "",
    };

    localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(tokenData));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return { user, tokens: tokenData };
  },

  /**
   * Refresh access token
   * The backend will handle the refresh token via HTTP-only cookie
   */
  async refreshToken(): Promise<AuthTokens> {
    try {
      // Call API - the refresh token is sent via HTTP-only cookie
      const { accessToken } = await refreshTokenApi();

      // Update only the access token in localStorage
      const updatedTokens: AuthTokens = {
        accessToken,
        refreshToken: "", // We don't store the actual refresh token
      };

      localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(updatedTokens));
      return updatedTokens;
    } catch (error) {
      console.error("Failed to refresh token:", error);

      // Clear local auth data on token refresh failure
      localStorage.removeItem(AUTH_TOKENS_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      throw error;
    }
  },

  /**
   * Register a new user
   */
  async register(
    name: string,
    email: string,
    password: string,
    roleName: string,
    dealershipId: string,
    outletId?: string
  ): Promise<AuthUser> {
    const user = await registerApi(
      name,
      email,
      password,
      roleName,
      dealershipId,
      outletId
    );
    return user;
  },

  /**
   * Log out the current user and clear stored data
   */
  async logout(): Promise<void> {
    try {
      // Call logout API - this should also clear the HTTP-only cookie
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed:", error);
      // Continue with local logout even if API fails
    } finally {
      // Clear stored auth data regardless of API success
      localStorage.removeItem(AUTH_TOKENS_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): AuthUser | null {
    try {
      const userJson = localStorage.getItem(AUTH_USER_KEY);
      if (!userJson) return null;
      return JSON.parse(userJson) as AuthUser;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }
  },

  /**
   * Get current tokens from localStorage
   */
  getTokens(): AuthTokens | null {
    try {
      const tokensJson = localStorage.getItem(AUTH_TOKENS_KEY);
      if (!tokensJson) return null;
      return JSON.parse(tokensJson) as AuthTokens;
    } catch (error) {
      console.error("Failed to parse tokens from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem(AUTH_TOKENS_KEY);
      return null;
    }
  },

  /**
   * Check if user is authenticated (has valid tokens)
   */
  isAuthenticated(): boolean {
    return !!this.getTokens()?.accessToken;
  },
};
