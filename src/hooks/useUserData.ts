import { useAuth } from "@/contexts/useAuth";
import type { AuthUser, PermissionName } from "@/types/auth";

/**
 * Hook for accessing user data, roles and permissions without additional API calls
 *
 * This hook uses the already-fetched auth data from login to provide user information
 * and permissions, eliminating the need for separate API calls.
 */
export const useUserData = () => {
  const { user } = useAuth();

  /**
   * Checks if the current user has a specific permission
   * @param permissionName The permission to check (format: "resource:action:scope")
   * @returns True if the user has the permission, false otherwise
   */
  const hasPermission = (permissionName: PermissionName): boolean => {
    if (!user || !user.permissions) return false;

    // Check if user has the exact permission
    if (user.permissions.includes(permissionName)) return true;

    // If the permission is :OWN scope, check if user has :ANY scope for the same resource:action
    if (permissionName.endsWith(":own")) {
      const [resource, action] = permissionName.split(":");
      const anyPermission = `${resource}:${action}:any`;
      return user.permissions.includes(anyPermission);
    }

    return false;
  };

  /**
   * Get all permissions for the current user
   * @returns Array of unique permissions the user has
   */
  const getUserPermissions = (): string[] => {
    if (!user || !user.permissions) return [];
    return [...user.permissions];
  };

  /**
   * Check if user has the specified role
   * @param roleName Role name to check against
   * @returns True if the user has the specified role
   */
  const hasRole = (roleName: string): boolean => {
    if (!user || !user.role) return false;
    return user.role === roleName;
  };

  return {
    user: user as AuthUser | null,
    role: user?.role || "",
    hasPermission,
    hasRole,
    getUserPermissions,
  };
};
