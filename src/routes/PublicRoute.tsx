import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

interface PublicRouteProps {
  restricted?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  restricted = false,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If restricted and user is authenticated, redirect to home
  // This prevents authenticated users from accessing login/register pages
  if (restricted && isAuthenticated) {
    // Try to redirect to the intended destination (if coming from a redirect)
    const from = location.state?.from || "/home";
    return <Navigate to={from} replace />;
  }

  // For unrestricted public routes or non-authenticated users
  return <Outlet />;
};
