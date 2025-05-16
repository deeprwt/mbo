/**
 * Core entity types based on API documentation
 */

// Common type for all entities with base fields
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// User entity
export interface User extends BaseEntity {
  name: string;
  email: string;
  roleId: string;
  dealershipId: string;
  outletId?: string;
  phone?: string;
  role?: {
    id: string;
    name: string;
    description: string;
  };
}

// Dealership entity
export interface Dealership extends BaseEntity {
  name: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  contactPhone: string;
  contactEmail: string;
  logoUrl?: string;
  website?: string;
  metadata?: Record<string, unknown>;
  outlets?: Outlet[];
}

// Outlet entity
export interface Outlet extends BaseEntity {
  name: string;
  type: "MBO" | "DISTRIBUTOR";
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  dealershipId: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  creditLimit: number;
  securityDeposit: number;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED" | "WORK_REQUIRED";
  metadata?: Record<string, unknown>;
}

// KYC Document entity
export interface KycDocument extends BaseEntity {
  documentType: "AADHAR" | "PAN" | "GST";
  documentNo: string;
  documentId: string;
  customerId?: string;
  outletId?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "WORK_REQUIRED";
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  verifiedBy?: string;
  verifiedAt?: string;
  approvalId?: string;
  dealershipId: string;
  metadata?: {
    frontImageUrl?: string;
    backImageUrl?: string;
    [key: string]: unknown;
  };
}

// Approval entity
export interface Approval extends BaseEntity {
  entityType: "MBO_ONBOARD" | "DC" | "PAYMENT" | "KYC_DOCUMENT";
  entityId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "WORK_REQUIRED";
  level: number;
  comments?: string;
  dealershipId: string;
  requestedBy?: {
    id: string;
    name: string;
  };
  approvedBy?: {
    id: string;
    name: string;
  };
  history?: ApprovalHistory[];
}

export interface ApprovalHistory {
  level: number;
  status: string;
  comments?: string;
  actionBy: {
    id: string;
    name: string;
  };
  timestamp: string;
}

// Approval Rule entity
export interface ApprovalRule extends BaseEntity {
  entityType: "MBO_ONBOARD" | "DC" | "PAYMENT" | "KYC_DOCUMENT";
  requiredRole: string;
  level: number;
  condition: Record<string, unknown>;
  dealershipId: string;
  createdBy:
    | string
    | {
        id: string;
        name: string;
      };
}

// Response types for API endpoints
export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  error?: string;
}

// MBO entity
export interface MBO extends BaseEntity {
  name: string;
  code: string;
  date: string;
  address: string;
  owner: string;
  contact: string;
  gstin: string;
  status: string;
  dealershipId: string;
  outletId?: string;
}
