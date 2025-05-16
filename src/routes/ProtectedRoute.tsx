import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { CircularProgress, Box } from "@mui/material";
import { useMemo } from "react";
import { usePermission } from "@/contexts/PermissionContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { checkRouteAccess, getFirstAuthorizedRoute } = usePermission();

  // Simple check for home/root routes
  const isHomeRoute = useMemo(() => {
    const path = location.pathname;
    return path === "/home" || path === "/" || path === "";
  }, [location.pathname]);

  console.log("ProtectedRoute checking path:", location.pathname);
  console.log("Is authenticated:", isAuthenticated);
  console.log("Is home route:", isHomeRoute);

  // Show loading state while checking auth
  if (isLoading) {
    console.log("Auth is still loading");
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If it's the home route or root, just render (shortcut)
  if (isHomeRoute) {
    console.log("Rendering home route content");
    return <Outlet />;
  }

  // Check if user has permission to access this route
  const hasAccess = checkRouteAccess(location.pathname);
  console.log("Has access to route:", hasAccess);

  // If user doesn't have permission, redirect to first authorized route
  if (!hasAccess) {
    const firstAuthorizedRoute = getFirstAuthorizedRoute();
    console.log("No access, redirecting to:", firstAuthorizedRoute);
    return <Navigate to={firstAuthorizedRoute} replace />;
  }

  // Render child routes if authenticated and authorized
  console.log("Rendering route content");
  return <Outlet />;
};
