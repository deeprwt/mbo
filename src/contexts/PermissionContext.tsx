import React, { createContext, useContext, useMemo } from "react";
import { useUserData } from "@/hooks/useUserData";
import type { NavItem } from "@/components/Sidenav/Sidenav";
import { ROUTE_PERMISSIONS } from "@/constants/routes";

// Define permission requirements for each route
export interface RoutePermission {
  path: string;
  requiredPermissions: string[]; // Format: "resource:action:scope", e.g. "MBO:READ:ANY"
}

// Define the context type
interface PermissionContextType {
  authorizedRoutes: NavItem[];
  checkRouteAccess: (path: string) => boolean;
  getFirstAuthorizedRoute: () => string;
}

// Create the context with a default value
const defaultContextValue: PermissionContextType = {
  authorizedRoutes: [],
  checkRouteAccess: (path: string) => {
    // By default, allow access to home route for authenticated users
    return path === "/home" || path === "/" || path === "";
  },
  getFirstAuthorizedRoute: () => "/home",
};

const PermissionContext =
  createContext<PermissionContextType>(defaultContextValue);

export const PermissionProvider: React.FC<{
  children: React.ReactNode;
  navItems: NavItem[];
}> = ({ children, navItems }) => {
  const { hasPermission } = useUserData();

  // Helper function to check if a user has permission considering ANY vs OWN scope
  const hasPermissionWithScopeCheck = (requiredPermission: string): boolean => {
    // Direct check - the hasPermission function already includes the ANY vs OWN logic
    return hasPermission(requiredPermission);
  };

  // Filter navigation items based on user permissions
  const authorizedRoutes = useMemo(() => {
    // Split the routes into home and non-home
    const homeRoute = navItems.find((item) => item.path === "/home");
    const nonHomeRoutes = navItems.filter((item) => item.path !== "/home");
    // Filter non-home routes based on permissions
    const authorizedNonHomeRoutes = nonHomeRoutes.filter((item) => {
      // Pattern match the nav item's path to the route patterns
      const routePermissions = Object.entries(ROUTE_PERMISSIONS).find(
        ([routePattern]) => {
          if (routePattern.includes(":")) {
            const routeRegex = new RegExp(
              "^" + routePattern.replace(/:\w+/g, "[^/]+") + "$"
            );
            return routeRegex.test(item.path);
          }
          return routePattern === item.path;
        }
      );
      // If no permissions required or none found, default to allowing access
      if (!routePermissions || routePermissions[1].length === 0) {
        return true;
      }
      // Check if user has any of the required permissions
      return routePermissions[1].some((permission) =>
        hasPermissionWithScopeCheck(permission)
      );
    });
    // Always include home route (if it exists) at the beginning
    const routes = homeRoute
      ? [homeRoute, ...authorizedNonHomeRoutes]
      : authorizedNonHomeRoutes;
    return routes;
  }, [navItems, hasPermission]);

  // Check if user has access to a specific route
  const checkRouteAccess = (path: string): boolean => {
    // Home route and root path are always accessible to authenticated users
    if (path === "/home" || path === "/" || path === "") {
      return true;
    }
    // Directly check against route patterns with parameters
    const routePermissions = Object.entries(ROUTE_PERMISSIONS).find(
      ([routePath]) => {
        if (routePath.includes(":")) {
          // Create a more accurate regex for path matching
          // Convert :param to regex capture groups and escape special characters
          const escapedRoutePath = routePath.replace(
            /[-/\\^$*+?.()|[\]{}]/g,
            "\\$&"
          );
          const regexPattern = escapedRoutePath.replace(/:\w+/g, "([^/]+)");
          const routeRegex = new RegExp("^" + regexPattern + "$");
          return routeRegex.test(path);
        }
        // For exact routes
        return routePath === path;
      }
    );
    // If no permissions required or none found, default to allowing access
    if (!routePermissions || routePermissions[1].length === 0) {
      return true;
    }
    // Check if user has any of the required permissions
    return routePermissions[1].some((permission) =>
      hasPermissionWithScopeCheck(permission)
    );
  };

  // Get the first route the user has access to
  const getFirstAuthorizedRoute = (): string => {
    // Home is always accessible for authenticated users
    return "/home";
  };

  const contextValue = {
    authorizedRoutes,
    checkRouteAccess,
    getFirstAuthorizedRoute,
  };

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
};

// Custom hook to use the permission context
export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  return context;
};
