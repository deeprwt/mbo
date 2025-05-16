export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  dealershipId?: string;
  outletId?: string;
}

// This is kept for backwards compatibility, can be removed later
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

// This is kept for backwards compatibility, can be removed later
export interface Permission {
  id: string;
  name: string; // format: "resource:action:scope" e.g. "USER:READ:ANY"
  description?: string;
  resource?: string;
  action?: string;
  scope?: string;
}

// Define string type for permission names to make it clearer
export type PermissionName = string; // format: "resource:action:scope" e.g. "USER:READ:ANY"

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * API response schemas based on documentation
 */
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Login response as defined in the API docs
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string; // We may not always get this back as it may be in HTTP-only cookie
  user: AuthUser;
}

/**
 * Token refresh response as defined in the API docs
 */
export interface RefreshTokenResponse {
  accessToken: string;
}

/**
 * Auth context interface for React context
 */
export interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    roleName: string,
    dealershipId: string,
    outletId?: string
  ) => Promise<void>;
  refreshToken?: () => Promise<boolean>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
