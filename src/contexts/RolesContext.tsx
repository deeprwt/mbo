import React, { createContext, useContext, useState, useCallback } from "react";
import type { Role } from "@/types";
import { useRoleService } from "@/services";
import { useAuth } from "./useAuth";

interface RolesContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
  refreshRoles: () => Promise<void>;
  createRole: (roleData: {
    name: string;
    description: string;
    permissionIds: string[];
  }) => Promise<Role>;
  updateRole: (
    roleId: string,
    roleData: {
      name?: string;
      description?: string;
      permissionIds?: string[];
      isActive?: boolean;
    }
  ) => Promise<Role>;
  deleteRole: (roleId: string) => Promise<void>;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const RolesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const roleService = useRoleService();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Lazy-load roles only when explicitly called - doesn't load automatically on mount
  const refreshRoles = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await roleService.getRoles(1, 100, true);
      setRoles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch roles");
      console.error("Error fetching roles:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, roleService]);

  // No useEffect to load roles on mount - we'll only load when explicitly called

  const createNewRole = useCallback(
    async (roleData: {
      name: string;
      description: string;
      permissionIds: string[];
    }): Promise<Role> => {
      setLoading(true);
      setError(null);

      try {
        // Ensure roles are loaded before creating
        if (roles.length === 0) {
          await refreshRoles();
        }

        const newRole = await roleService.createRole(roleData);
        setRoles((prev) => [...prev, newRole]);
        return newRole;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create role");
        console.error("Error creating role:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [roleService, roles.length, refreshRoles]
  );

  const updateExistingRole = useCallback(
    async (
      roleId: string,
      roleData: {
        name?: string;
        description?: string;
        permissionIds?: string[];
        isActive?: boolean;
      }
    ): Promise<Role> => {
      setLoading(true);
      setError(null);

      try {
        // Ensure roles are loaded before updating
        if (roles.length === 0) {
          await refreshRoles();
        }

        const updatedRole = await roleService.updateRole(roleId, roleData);
        setRoles((prev) =>
          prev.map((role) => (role.id === roleId ? updatedRole : role))
        );
        return updatedRole;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update role");
        console.error(`Error updating role ${roleId}:`, err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [roleService, roles.length, refreshRoles]
  );

  const deleteExistingRole = useCallback(
    async (roleId: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        // Ensure roles are loaded before deleting
        if (roles.length === 0) {
          await refreshRoles();
        }

        await roleService.deleteRole(roleId);
        setRoles((prev) => prev.filter((role) => role.id !== roleId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete role");
        console.error(`Error deleting role ${roleId}:`, err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [roleService, roles.length, refreshRoles]
  );

  const value = {
    roles,
    loading,
    error,
    refreshRoles,
    createRole: createNewRole,
    updateRole: updateExistingRole,
    deleteRole: deleteExistingRole,
  };

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
};

export const useRoles = (): RolesContextType => {
  const context = useContext(RolesContext);

  if (context === undefined) {
    throw new Error("useRoles must be used within a RolesProvider");
  }

  return context;
};
