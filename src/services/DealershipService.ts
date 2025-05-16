import { useAuthenticatedApi } from "@/hooks";
import { API_ENDPOINTS } from "@/constants/api";
import type { Dealership, ApiResponse, PaginatedResponse } from "@/types";

/**
 * Interface for dashboard summary data, used by the HomePage
 */
export interface DashboardSummary {
  totalMbo: number;
  inventoryValue: string;
  totalInventory: number;
  inventoryDays: number;
  changeRates: {
    mboChange: string;
    inventoryValueChange: string;
    totalInventoryChange: string;
    daysChange: string;
  };
}

/**
 * Service for dealership-related operations
 * Uses the authenticated API hook for making requests
 */
export const useDealershipService = () => {
  const api = useAuthenticatedApi();

  /**
   * Get all dealerships with pagination
   */
  const getDealerships = async (page = 1, pageSize = 10) => {
    const response = await api.get<PaginatedResponse<Dealership>>(
      `${API_ENDPOINTS.DEALERSHIPS.BASE}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  };

  /**
   * Get a dealership by ID
   */
  const getDealershipById = async (dealershipId: string) => {
    const response = await api.get<ApiResponse<Dealership>>(
      API_ENDPOINTS.DEALERSHIPS.BY_ID(dealershipId)
    );
    return response.data.data;
  };

  /**
   * Create a new dealership
   */
  const createDealership = async (dealershipData: {
    name: string;
    gstNumber: string;
    panNumber: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    website?: string;
  }) => {
    const response = await api.post<ApiResponse<Dealership>>(
      API_ENDPOINTS.DEALERSHIPS.BASE,
      dealershipData
    );
    return response.data.data;
  };

  /**
   * Update an existing dealership
   */
  const updateDealership = async (
    dealershipId: string,
    dealershipData: {
      name?: string;
      address?: string;
      contactPhone?: string;
      contactEmail?: string;
      city?: string;
      state?: string;
      pincode?: string;
      country?: string;
      website?: string;
      isActive?: boolean;
    }
  ) => {
    const response = await api.put<ApiResponse<Dealership>>(
      API_ENDPOINTS.DEALERSHIPS.BY_ID(dealershipId),
      dealershipData
    );
    return response.data.data;
  };

  /**
   * Get dashboard summary data for the current dealership
   * Note: This endpoint returns mock data as the backend doesn't have a specific dashboard endpoint yet
   */
  const getDashboardSummary = () => {
    // Return mock data immediately without async delay
    return {
      totalMbo: 103,
      inventoryValue: "2.6cr",
      totalInventory: 500,
      inventoryDays: 3,
      changeRates: {
        mboChange: "+10%",
        inventoryValueChange: "-2%",
        totalInventoryChange: "-10%",
        daysChange: "-1%",
      },
    };
  };

  return {
    getDealerships,
    getDealershipById,
    createDealership,
    updateDealership,
    getDashboardSummary,
  };
};
