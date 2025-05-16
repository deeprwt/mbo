import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

/**
 * Hook to redirect users away from routes that require authentication
 * if they are not logged in.
 *
 * @param redirectTo Path to redirect to if not authenticated
 * @returns Object with authentication state: isAuthenticated and isLoading
 */
export const useRequireAuth = (redirectTo: string = "/login") => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait until auth state is determined
    if (isLoading) return;

    // If not authenticated and not already at the redirectTo page
    if (!isAuthenticated && location.pathname !== redirectTo) {
      // Store the location they were trying to go to
      navigate(redirectTo, {
        state: { from: location.pathname },
      });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, location.pathname]);

  return { isAuthenticated, isLoading };
};
