import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import UserIcon from "@mui/icons-material/Person";
// import BugReportIcon from "@mui/icons-material/BugReport";
// Add more icons as needed

/**
 * Routes
 *
 * This is our single source of truth for route paths, labels, icons, and permissions.
 * Use this when generating links or navigating throughout the application.
 */
export const ROUTES = {
  HOME: {
    key: "HOME",
    label: "Home",
    path: "/home",
    icon: HomeIcon,
    permissions: [], // accessible to all authenticated users
  },
  MBO_MANAGEMENT: {
    key: "MBO_MANAGEMENT",
    label: "MBO Management",
    path: (dealerId: string) => `/dealer/${dealerId}/mbo-management`,
    icon: GroupIcon,
    permissions: ["outlet:read:own", "outlet:read:any"],
  },
  OUTLET_DETAILS: {
    key: "OUTLET_DETAILS",
    label: "Outlet Details",
    path: (dealerId: string, outletId: string) =>
      `/dealer/${dealerId}/outlet/${outletId}/details`,
    icon: StoreIcon,
    permissions: ["outlet:read:own", "outlet:read:any"],
  },
  USER_MANAGEMENT: {
    key: "USER_MANAGEMENT",
    label: "User Management",
    path: (dealerId: string) => `/dealer/${dealerId}/users`,
    icon: UserIcon,
    permissions: ["user:read:own", "user:read:any"],
  },
  MBO_MANAGEMENT_DETAILS: {
    key: "MBO_MANAGEMENT_DETAILS",
    label: "MBO Details",
    path: (dealerId: string, mboId: string) =>
      `/dealer/${dealerId}/mbo-management/${mboId}`,
    icon: GroupIcon,
    permissions: ["outlet:read:own", "outlet:read:any"],
  },
  // Add more routes here as needed
};

/**
 * Permission mapping for route pattern matching
 *
 * Used by the permission system to check if a user
 * has access to specific routes (including dynamic parameters)
 */
export const ROUTE_PERMISSIONS: Record<string, string[]> = {
  // Explicitly match home routes
  "/home": [],

  // Match all dealer-scoped routes
  "/dealer/:dealerId/mbo-management": ["outlet:read:own", "outlet:read:any"],
  "/dealer/:dealerId/mbo-management/:mboId": [
    "outlet:read:own",
    "outlet:read:any",
  ],
  "/dealer/:dealerId/outlet/:outletId/details": [
    "outlet:read:own",
    "outlet:read:any",
  ],
  "/dealer/:dealerId/users": ["user:read:own", "user:read:any"],
  // Add more mappings as needed
};

// Utility to get all static and dynamic route patterns
export const ROUTE_PATTERNS = Object.keys(ROUTE_PERMISSIONS);
