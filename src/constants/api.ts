// API Response Status
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },

  // Role endpoints
  ROLES: {
    BASE: "/roles",
    BY_ID: (id: string) => `/roles/${id}`,
  },

  // Dealership endpoints
  DEALERSHIPS: {
    BASE: "/dealerships",
    BY_ID: (id: string) => `/dealerships/${id}`,
  },

  // Outlet endpoints
  OUTLETS: {
    BASE: "/outlets",
    BY_ID: (id: string) => `/outlets/${id}`,
    FILTER: (type = "MBO") => `/outlets?type=${type}`,
  },

  // Approval endpoints
  APPROVALS: {
    BASE: "/approvals",
    BY_ID: (id: string) => `/approvals/${id}`,
  },

  // KYC Document endpoints
  KYC_DOCUMENTS: {
    BASE: "/kyc-documents",
    BY_ID: (id: string) => `/kyc-documents/${id}`,
    BY_CUSTOMER: (customerId: string) =>
      `/kyc-documents/customer/${customerId}`,
    UPDATE_STATUS: (id: string) => `/kyc-documents/${id}/status`,
  },
};

// Entity Types
export const ENTITY_TYPES = {
  MBO_ONBOARD: "MBO_ONBOARD",
  DELIVERY_CHALLAN: "DC",
  PAYMENT: "PAYMENT",
  KYC_DOCUMENT: "KYC_DOCUMENT",
};

// Approval Status
export const APPROVAL_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  WORK_REQUIRED: "WORK_REQUIRED",
};

// Document Types
export const DOCUMENT_TYPES = {
  AADHAR: "AADHAR",
  PAN: "PAN",
  GST: "GST",
  // Add other document types as needed
};
