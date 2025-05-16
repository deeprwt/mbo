import { apiClient } from "./axiosConfig";
import { API_ENDPOINTS } from "@/constants/api";
import type { Role } from "@/types/auth";

interface RolesResponse {
  status: string;
  data: Role[];
}

interface RoleResponse {
  status: string;
  data: Role;
}

/**
 * Get all roles
 * Required Permission: ROLE:READ:ANY
 */
export const getAllRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get<RolesResponse>(API_ENDPOINTS.ROLES.BASE);
  return response.data.data;
};

/**
 * Get role by ID
 * Required Permission: ROLE:READ:ANY
 */
export const getRoleById = async (roleId: string): Promise<Role> => {
  const response = await apiClient.get<RoleResponse>(
    API_ENDPOINTS.ROLES.BY_ID(roleId)
  );
  return response.data.data;
};

/**
 * Create a new role
 * Required Permission: ROLE:CREATE:ANY
 */
export const createRole = async (
  name: string,
  description: string,
  permissionIds: string[]
): Promise<Role> => {
  const response = await apiClient.post<RoleResponse>(
    API_ENDPOINTS.ROLES.BASE,
    {
      name,
      description,
      permissionIds,
    }
  );
  return response.data.data;
};

/**
 * Update a role
 * Required Permission: ROLE:UPDATE:ANY
 */
export const updateRole = async (
  roleId: string,
  updates: {
    name?: string;
    description?: string;
    permissionIds?: string[];
    isActive?: boolean;
  }
): Promise<Role> => {
  const response = await apiClient.put<RoleResponse>(
    API_ENDPOINTS.ROLES.BY_ID(roleId),
    updates
  );
  return response.data.data;
};

/**
 * Delete a role
 * Required Permission: ROLE:DELETE:ANY
 */
export const deleteRole = async (roleId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.ROLES.BY_ID(roleId));
};
