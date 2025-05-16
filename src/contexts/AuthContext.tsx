import React, { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthContextType, AuthUser, AuthTokens } from "@/types/auth";
import { AuthService } from "@/services/AuthService";
import { useNotification } from "./useNotification";
import { apiClient } from "@/apis/axiosConfig";

// Create the context with undefined as default value
const AuthContextInternal = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Provider component for authentication state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { showSuccess, showApiError } = useNotification();
  const [user, setUser] = useState<AuthUser | null>(
    AuthService.getCurrentUser()
  );
  const [tokens, setTokens] = useState<AuthTokens | null>(
    AuthService.getTokens()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!tokens;

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    const storedTokens = AuthService.getTokens();

    if (storedUser && storedTokens) {
      setUser(storedUser);
      setTokens(storedTokens);
      apiClient.accessToken = storedTokens.accessToken;
      // Ensure logged out flag is reset on init if we have valid tokens
      apiClient.resetLoggedOutFlag();
      console.log("Auth state initialized from localStorage");
    } else {
      // If no stored tokens, ensure we're in logged out state
      apiClient.setLoggedOutFlag();
      console.log("No stored auth tokens, set to logged out state");
    }
  }, []);

  /**
   * Login handler
   */
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      console.log("Starting login process");

      try {
        // Explicitly reset logged out flag before starting login
        apiClient.resetLoggedOutFlag();

        const { user, tokens } = await AuthService.login(email, password);
        console.log("Login successful, setting auth state");
        setUser(user);
        setTokens(tokens);
        apiClient.accessToken = tokens.accessToken;
        // Reset again after successful login to be certain
        apiClient.resetLoggedOutFlag();
        showSuccess("Login successful");
        navigate("/"); // Redirect to dashboard after login
      } catch (err) {
        console.error("Login failed:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        showApiError(err, "Login failed");
        // Make sure we're in logged out state after failed login
        apiClient.setLoggedOutFlag();
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, showSuccess, showApiError]
  );

  /**
   * Register handler
   */
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      roleName: string,
      dealershipId: string,
      outletId?: string
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        await AuthService.register(
          name,
          email,
          password,
          roleName,
          dealershipId,
          outletId
        );
        showSuccess("Registration successful. Please log in.");
        // After registration, navigate to login instead of auto-login
        navigate("/login");
      } catch (err) {
        console.error("Registration failed:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        showApiError(err, "Registration failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, showSuccess, showApiError]
  );

  /**
   * Logout handler
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    // Set logged out flag before API call to prevent requests during logout
    apiClient.setLoggedOutFlag();

    try {
      await AuthService.logout();
      setUser(null);
      setTokens(null);
      apiClient.accessToken = null;
      showSuccess("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      showApiError(err, "Logout failed, but you've been logged out locally");
      // Still clear local state even if API call fails
      setUser(null);
      setTokens(null);
      apiClient.accessToken = null;
      navigate("/login");
    } finally {
      // Reset isLoggedOut flag on logout completion
      setIsLoading(false);
    }
  }, [navigate, showSuccess, showApiError]);

  // Context value
  const contextValue: AuthContextType = {
    user,
    tokens,
    isAuthenticated,
    login,
    logout,
    register,
    isLoading,
    error,
  } as unknown as AuthContextType;

  return (
    <AuthContextInternal.Provider value={contextValue}>
      {children}
    </AuthContextInternal.Provider>
  );
};

export const AuthContext = AuthContextInternal;
