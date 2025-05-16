import { useCallback } from "react";
import { useUserService } from "@/services";
import { useNotification } from "@/contexts/useNotification";
import type { User } from "@/types";

/**
 * Hook that provides user actions with automatic notification handling
 */
export const useUserActions = () => {
  const { showSuccess, showApiError } = useNotification();
  const userService = useUserService();

  /**
   * Create a user with notifications
   */
  const createUser = useCallback(
    async (userData: {
      name: string;
      email: string;
      password: string;
      roleId: string;
      outletId?: string;
      phone?: string;
    }): Promise<User | null> => {
      try {
        const user = await userService.createUser(userData);
        showSuccess(`User ${userData.name} created successfully`);
        return user;
      } catch (error) {
        showApiError(error, "Failed to create user");
        return null;
      }
    },
    [showSuccess, showApiError, userService]
  );

  /**
   * Update a user with notifications
   */
  const updateUser = useCallback(
    async (
      userId: string,
      userData: {
        name?: string;
        email?: string;
        roleId?: string;
        outletId?: string;
        phone?: string;
        isActive?: boolean;
      }
    ): Promise<User | null> => {
      try {
        const user = await userService.updateUser(userId, userData);
        showSuccess(`User ${user.name} updated successfully`);
        return user;
      } catch (error) {
        showApiError(error, "Failed to update user");
        return null;
      }
    },
    [showSuccess, showApiError, userService]
  );

  /**
   * Delete a user with notifications
   */
  const deleteUser = useCallback(
    async (userId: string, userName: string): Promise<boolean> => {
      try {
        await userService.deleteUser(userId);
        showSuccess(`User ${userName} deleted successfully`);
        return true;
      } catch (error) {
        showApiError(error, "Failed to delete user");
        return false;
      }
    },
    [showSuccess, showApiError, userService]
  );

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};
