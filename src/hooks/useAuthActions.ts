import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/AuthService";
import { useNotification } from "@/contexts/useNotification";
import type { AuthUser, AuthTokens } from "@/types/auth";

/**
 * Hook that provides authentication actions with notification handling
 */
export const useAuthActions = () => {
  const { showSuccess, showApiError } = useNotification();
  const navigate = useNavigate();

  /**
   * Login with notification handling
   */
  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ user: AuthUser; tokens: AuthTokens } | null> => {
      try {
        const result = await AuthService.login(email, password);
        showSuccess("Login successful");
        return result;
      } catch (error) {
        showApiError(error, "Login failed");
        return null;
      }
    },
    [showSuccess, showApiError]
  );

  /**
   * Register with notification handling
   */
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      roleName: string,
      dealershipId: string,
      outletId?: string
    ): Promise<AuthUser | null> => {
      try {
        const user = await AuthService.register(
          name,
          email,
          password,
          roleName,
          dealershipId,
          outletId
        );
        showSuccess("Registration successful. Please login.");
        navigate("/login");
        return user;
      } catch (error) {
        showApiError(error, "Registration failed");
        return null;
      }
    },
    [showSuccess, showApiError, navigate]
  );

  /**
   * Logout with notification handling
   */
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      await AuthService.logout();
      showSuccess("Logged out successfully");
      navigate("/login");
      return true;
    } catch (error) {
      showApiError(error, "Logout failed");
      // Force logout even if API call fails
      navigate("/login");
      return false;
    }
  }, [showSuccess, showApiError, navigate]);

  return {
    login,
    register,
    logout,
  };
};
