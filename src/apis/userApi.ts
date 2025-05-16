import { apiClient } from "./axiosConfig";
import { API_ENDPOINTS } from "@/constants/api";
import type { AuthUser } from "@/types/auth";

interface UsersResponse {
  success: boolean;
  data: AuthUser[];
}

interface UserResponse {
  success: boolean;
  data: AuthUser;
}

/**
 * Get all users for the current dealership
 * Required Permission: USER:READ:ANY
 */
export const getAllUsers = async (): Promise<AuthUser[]> => {
  const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.USERS.BASE);
  return response.data.data;
};

/**
 * Get user by ID
 * Required Permission: USER:READ:ANY or USER:READ:OWN
 */
export const getUserById = async (userId: string): Promise<AuthUser> => {
  const response = await apiClient.get<UserResponse>(
    API_ENDPOINTS.USERS.BY_ID(userId)
  );
  return response.data.data;
};

/**
 * Create a new user
 * Required Permission: USER:CREATE:ANY
 */
export const createUser = async (
  name: string,
  email: string,
  password: string,
  roleId: string,
  outletId?: string,
  phone?: string
): Promise<AuthUser> => {
  const response = await apiClient.post<UserResponse>(
    API_ENDPOINTS.USERS.BASE,
    {
      name,
      email,
      password,
      roleId,
      outletId,
      phone,
    }
  );
  return response.data.data;
};

/**
 * Update a user
 * Required Permission: USER:UPDATE:ANY or USER:UPDATE:OWN
 */
export const updateUser = async (
  userId: string,
  updates: {
    name?: string;
    email?: string;
    roleId?: string;
    outletId?: string;
    phone?: string;
    isActive?: boolean;
  }
): Promise<AuthUser> => {
  const response = await apiClient.put<UserResponse>(
    API_ENDPOINTS.USERS.BY_ID(userId),
    updates
  );
  return response.data.data;
};

/**
 * Delete a user (soft delete)
 * Required Permission: USER:DELETE:ANY
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.USERS.BY_ID(userId));
};
