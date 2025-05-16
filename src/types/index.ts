/**
 * Central types index file for easy imports
 */

// Re-export all types from separate type files
export * from "./auth";
export * from "./models";

// Common shared types
export type EntityStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "WORK_REQUIRED";
export type EntityType = "MBO_ONBOARD" | "DC" | "PAYMENT" | "KYC_DOCUMENT";
export type DocumentType = "AADHAR" | "PAN" | "GST";
export type OutletType = "MBO" | "DISTRIBUTOR";
export type OutletStatus = "ACTIVE" | "INACTIVE" | "PENDING";

// Generic response types
export interface ErrorField {
  field: string;
  message: string;
}

export interface ValidationError {
  status: string;
  message: string;
  errors: ErrorField[];
}

export interface ApiSuccessMessage {
  status: string;
  message: string;
}
