import { useAuthenticatedApi } from "@/hooks";
import { API_ENDPOINTS } from "@/constants/api";
import type { User, ApiResponse, PaginatedResponse } from "@/types";

/**
 * Service for user-related operations
 * Uses the authenticated API hook for making requests
 */
export const useUserService = () => {
  const api = useAuthenticatedApi();

  /**
   * Get all users with pagination
   */
  const getUsers = async (page = 1, pageSize = 10) => {
    const response = await api.get<PaginatedResponse<User>>(
      `${API_ENDPOINTS.USERS.BASE}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  };

  /**
   * Get a user by ID
   */
  const getUserById = async (userId: string) => {
    const response = await api.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BY_ID(userId)
    );
    return response.data.data;
  };

  /**
   * Create a new user
   */
  const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    roleId: string;
    outletId?: string;
    phone?: string;
  }) => {
    const response = await api.post<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BASE,
      userData
    );
    return response.data.data;
  };

  /**
   * Update an existing user
   */
  const updateUser = async (
    userId: string,
    userData: {
      name?: string;
      email?: string;
      roleId?: string;
      outletId?: string;
      phone?: string;
      isActive?: boolean;
    }
  ) => {
    const response = await api.put<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BY_ID(userId),
      userData
    );
    return response.data.data;
  };

  /**
   * Delete a user
   */
  const deleteUser = async (userId: string) => {
    const response = await api.delete<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.USERS.BY_ID(userId)
    );
    return response.data;
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
