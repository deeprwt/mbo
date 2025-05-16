import { useAuthenticatedApi } from "@/hooks";
import { API_ENDPOINTS } from "@/constants/api";
import type { Role, ApiResponse, PaginatedResponse } from "@/types";

/**
 * Service for role-related operations
 * Uses the authenticated API hook for making requests
 */
export const useRoleService = () => {
  const api = useAuthenticatedApi();

  /**
   * Get all roles with pagination
   */
  const getRoles = async (
    page = 1,
    pageSize = 10,
    includePermissions = false
  ) => {
    const response = await api.get<PaginatedResponse<Role>>(
      `${API_ENDPOINTS.ROLES.BASE}?page=${page}&pageSize=${pageSize}&includePermissions=${includePermissions}`
    );
    return response.data;
  };

  /**
   * Get a role by ID
   */
  const getRoleById = async (roleId: string, includePermissions = true) => {
    const response = await api.get<ApiResponse<Role>>(
      `${API_ENDPOINTS.ROLES.BY_ID(
        roleId
      )}?includePermissions=${includePermissions}`
    );
    return response.data.data;
  };

  /**
   * Create a new role
   */
  const createRole = async (roleData: {
    name: string;
    description: string;
    permissionIds: string[];
  }) => {
    const response = await api.post<ApiResponse<Role>>(
      API_ENDPOINTS.ROLES.BASE,
      roleData
    );
    return response.data.data;
  };

  /**
   * Update an existing role
   */
  const updateRole = async (
    roleId: string,
    roleData: {
      name?: string;
      description?: string;
      permissionIds?: string[];
      isActive?: boolean;
    }
  ) => {
    const response = await api.put<ApiResponse<Role>>(
      API_ENDPOINTS.ROLES.BY_ID(roleId),
      roleData
    );
    return response.data.data;
  };

  /**
   * Delete a role
   */
  const deleteRole = async (roleId: string) => {
    const response = await api.delete<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.ROLES.BY_ID(roleId)
    );
    return response.data;
  };

  return {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
  };
};
