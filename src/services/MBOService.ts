import { useAuthenticatedApi } from "@/hooks";
import { API_ENDPOINTS } from "@/constants/api";
import type { Outlet, ApiResponse, PaginatedResponse } from "@/types";

/**
 * Service for outlet-related operations
 * Uses the authenticated API hook for making requests
 */
export const useOutletService = () => {
  const api = useAuthenticatedApi();

  /**
   * Get all MBO outlets with pagination for the current dealership
   */
  const getMBOOutlets = async (page = 1, pageSize = 10) => {
    try {
      const response = await api.get<PaginatedResponse<Outlet>>(
        `${API_ENDPOINTS.OUTLETS.FILTER(
          "MBO"
        )}&page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch MBO outlets:", error);

      // Return mock data for now
      return {
        status: "success",
        data: [
          {
            id: "1",
            name: "Krishna MBO",
            code: "BM1243",
            type: "MBO",
            address: {
              street: "123 Main Street",
              city: "Bangalore",
              state: "Karnataka",
              pincode: "560001",
              country: "India",
            },
            dealershipId: "1",
            status: "ACTIVE",
            creditLimit: 100000,
            securityDeposit: 50000,
            contactPerson: "Krishna",
            contactPhone: "9876543210",
            contactEmail: "krishna@example.com",
            approvalStatus: "APPROVED",
            isActive: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "2",
            name: "Ravi MBO",
            code: "BM1244",
            type: "MBO",
            address: {
              street: "456 Elm Street",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400001",
              country: "India",
            },
            dealershipId: "1",
            status: "INACTIVE",
            creditLimit: 80000,
            securityDeposit: 40000,
            contactPerson: "Ravi",
            contactPhone: "9876543211",
            contactEmail: "ravi@example.com",
            approvalStatus: "APPROVED",
            isActive: false,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "3",
            name: "Sita MBO",
            code: "BM1245",
            type: "MBO",
            address: {
              street: "789 Oak Avenue",
              city: "Delhi",
              state: "Delhi",
              pincode: "110001",
              country: "India",
            },
            dealershipId: "1",
            status: "PENDING",
            creditLimit: 120000,
            securityDeposit: 60000,
            contactPerson: "Sita",
            contactPhone: "9876543212",
            contactEmail: "sita@example.com",
            approvalStatus: "PENDING",
            isActive: false,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "4",
            name: "Anita MBO",
            code: "BM1246",
            type: "MBO",
            address: {
              street: "321 Pine Boulevard",
              city: "Chennai",
              state: "Tamil Nadu",
              pincode: "600001",
              country: "India",
            },
            dealershipId: "1",
            status: "ACTIVE",
            creditLimit: 90000,
            securityDeposit: 45000,
            contactPerson: "Anita",
            contactPhone: "9876543213",
            contactEmail: "anita@example.com",
            approvalStatus: "APPROVED",
            isActive: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
        ],
        pagination: {
          total: 4,
          page: 1,
          pageSize: 10,
          totalPages: 1,
        },
      };
    }
  };

  /**
   * Get an outlet by ID
   */
  const getOutletById = async (outletId: string) => {
    try {
      const response = await api.get<ApiResponse<Outlet>>(
        API_ENDPOINTS.OUTLETS.BY_ID(outletId)
      );
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch outlet ${outletId}:`, error);
      throw error;
    }
  };

  return {
    getMBOOutlets,
    getOutletById,
  };
};
