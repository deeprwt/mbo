import React from "react";
import { AuthProvider } from "./AuthContext";
import { RolesProvider } from "./RolesContext";
import { UsersProvider } from "./UsersContext";
import { NotificationProvider } from "./NotificationContext";
import { PermissionProvider } from "./PermissionContext";
import { ROUTES } from "@/constants/routes";
import { useUserData } from "@/hooks/useUserData";

// Re-export all context hooks and providers
export { AuthProvider } from "./AuthContext";
export { useAuth } from "./useAuth";
export { RolesProvider, useRoles } from "./RolesContext";
export { UsersProvider, useUsers } from "./UsersContext";
export { NotificationProvider } from "./NotificationContext";
export { useNotification } from "./useNotification";
export { PermissionProvider, usePermission } from "./PermissionContext";

// Combined provider for easier app setup
interface AppProvidersProps {
  children: React.ReactNode;
}

const NavItemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUserData();
  const dealerId = user?.dealershipId || "default";

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
    <PermissionProvider navItems={navItems}>{children}</PermissionProvider>
  );
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RolesProvider>
          <UsersProvider>
            <NavItemsProvider>{children}</NavItemsProvider>
          </UsersProvider>
        </RolesProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};
