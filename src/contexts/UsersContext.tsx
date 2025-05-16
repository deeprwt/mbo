import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { User } from "@/types";
import { useUserService } from "@/services";
import { useAuth } from "./useAuth";
import { useUserData } from "@/hooks";

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  refreshUsers: () => Promise<void>;
  createUser: (userData: {
    name: string;
    email: string;
    password: string;
    roleId: string;
    outletId?: string;
    phone?: string;
  }) => Promise<User>;
  updateUser: (
    userId: string,
    userData: {
      name?: string;
      email?: string;
      roleId?: string;
      outletId?: string;
      phone?: string;
      isActive?: boolean;
    }
  ) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { user: currentUser } = useUserData();
  const userService = useUserService();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with current user from AuthContext if available
  useEffect(() => {
    if (currentUser && !users.some((u) => u.id === currentUser.id)) {
      // Convert AuthUser to User by mapping required properties
      const userForList: User = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        isActive: currentUser.isActive,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
        roleId:
          currentUser.roles && currentUser.roles.length > 0
            ? currentUser.roles[0].id
            : "", // Use first role's ID if available
        dealershipId: currentUser.dealershipId || "",
        outletId: currentUser.outletId,
        phone: currentUser.phone,
        role:
          currentUser.roles && currentUser.roles.length > 0
            ? {
                id: currentUser.roles[0].id,
                name: currentUser.roles[0].name,
                description: currentUser.roles[0].description,
              }
            : undefined,
      };

      setUsers((prev) => [...prev, userForList]);
    }
  }, [currentUser]);

  const refreshUsers = useCallback(async () => {
    if (!isAuthenticated) return;

    // If we only need the current user and it's already available, don't make the API call
    if (users.length === 1 && users[0].id === currentUser?.id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, userService, users, currentUser]);

  // Load users only when explicitly needed, not on mount
  // This prevents unnecessary API calls since we already have the current user

  const createNewUser = useCallback(
    async (userData: {
      name: string;
      email: string;
      password: string;
      roleId: string;
      outletId?: string;
      phone?: string;
    }): Promise<User> => {
      setLoading(true);
      setError(null);

      try {
        const newUser = await userService.createUser(userData);
        setUsers((prev) => [...prev, newUser]);
        return newUser;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create user");
        console.error("Error creating user:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userService]
  );

  const updateExistingUser = useCallback(
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
    ): Promise<User> => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await userService.updateUser(userId, userData);
        setUsers((prev) =>
          prev.map((user) => (user.id === userId ? updatedUser : user))
        );
        return updatedUser;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update user");
        console.error(`Error updating user ${userId}:`, err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userService]
  );

  const deleteExistingUser = useCallback(
    async (userId: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await userService.deleteUser(userId);
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete user");
        console.error(`Error deleting user ${userId}:`, err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userService]
  );

  const value = {
    users,
    loading,
    error,
    refreshUsers,
    createUser: createNewUser,
    updateUser: updateExistingUser,
    deleteUser: deleteExistingUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }

  return context;
};
