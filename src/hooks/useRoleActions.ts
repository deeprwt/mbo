import { useCallback } from "react";
import { useRoleService } from "@/services";
import { useNotification } from "@/contexts/useNotification";
import type { Role } from "@/types";

/**
 * Hook that provides role actions with automatic notification handling
 */
export const useRoleActions = () => {
  const { showSuccess, showApiError } = useNotification();
  const roleService = useRoleService();

  /**
   * Create a role with notifications
   */
  const createRole = useCallback(
    async (roleData: {
      name: string;
      description: string;
      permissionIds: string[];
    }): Promise<Role | null> => {
      try {
        const role = await roleService.createRole(roleData);
        showSuccess(`Role ${roleData.name} created successfully`);
        return role;
      } catch (error) {
        showApiError(error, "Failed to create role");
        return null;
      }
    },
    [showSuccess, showApiError, roleService]
  );

  /**
   * Update a role with notifications
   */
  const updateRole = useCallback(
    async (
      roleId: string,
      roleData: {
        name?: string;
        description?: string;
        permissionIds?: string[];
        isActive?: boolean;
      }
    ): Promise<Role | null> => {
      try {
        const role = await roleService.updateRole(roleId, roleData);
        showSuccess(`Role ${role.name} updated successfully`);
        return role;
      } catch (error) {
        showApiError(error, "Failed to update role");
        return null;
      }
    },
    [showSuccess, showApiError, roleService]
  );

  /**
   * Delete a role with notifications
   */
  const deleteRole = useCallback(
    async (roleId: string, roleName: string): Promise<boolean> => {
      try {
        await roleService.deleteRole(roleId);
        showSuccess(`Role ${roleName} deleted successfully`);
        return true;
      } catch (error) {
        showApiError(error, "Failed to delete role");
        return false;
      }
    },
    [showSuccess, showApiError, roleService]
  );

  return {
    createRole,
    updateRole,
    deleteRole,
  };
};
