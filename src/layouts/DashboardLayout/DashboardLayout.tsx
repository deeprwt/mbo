import React, { useCallback } from "react";
import { Box } from "@mui/material";
import { Sidenav } from "@/components/Sidenav";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useUserData } from "@/hooks/useUserData";

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserData();
  const dealerId = user?.dealershipId || "default";

  // Enhanced navigation function to handle routing properly
  const handleNavigate = useCallback(
    (path: string) => {
      console.log(`📱 DashboardLayout - Handling navigation to: ${path}`);

      // Navigate to the path
      navigate(path);

      console.log(`🏁 Navigation completed to: ${path}`);
    },
    [navigate]
  );

  // All nav items except Home are dealer-scoped
  const navItems = [
    {
      label: ROUTES.HOME.label,
      icon: <ROUTES.HOME.icon />,
      path: ROUTES.HOME.path,
    },
    {
      label: ROUTES.MBO_MANAGEMENT.label,
      icon: <ROUTES.MBO_MANAGEMENT.icon />,
      path: ROUTES.MBO_MANAGEMENT.path(dealerId),
    },
    {
      label: ROUTES.USER_MANAGEMENT.label,
      icon: <ROUTES.USER_MANAGEMENT.icon />,
      path: ROUTES.USER_MANAGEMENT.path(dealerId),
    },
    // Add more nav items as needed from ROUTES
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      <Sidenav
        key={`sidenav-${dealerId}`} // Force re-render when dealerId changes
        navItems={navItems}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />
      <Box sx={{ flex: 1, minWidth: 0, bgcolor: "#fff", p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};
