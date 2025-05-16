import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
// import { ROUTES } from "@/constants/routes"; // Not used directly here

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const MBOManagementPage = lazy(
  () => import("@/pages/mbo-management/MBOManagementPage")
);
const MBOManagementDetailsPage = lazy(
  () => import("@/pages/MBOManagementDetailsPage/MBOManagementDetailsPage")
);
// const OutletDetailsPage = lazy(
//   () => import("@/pages/outlet/OutletDetailsPage")
// );
const MBOCreationPage = lazy(() =>
  import("@/pages/mbo-creation/MBOCreationPage")
);
const UserManagementPage = lazy(
  () => import("@/pages/users/UserManagementPage")
);
const UnauthorizedPage = lazy(
  () => import("@/pages/unauthorized/UnauthorizedPage")
);
const DebugRoutes = lazy(() => import("@/pages/DebugRoutes"));

// Public routes (no authentication required)
export const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];

// Protected routes (authentication required)
export const protectedRoutes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
          {
      path: "mbo-creation", // ✅ Add it here
      element: <MBOCreationPage />,
    },
      {
        path: "debug",
        element: <DebugRoutes />,
      },
      {
        path: "dealer/:dealerId",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="mbo-management" replace />,
          },
          {
            path: "mbo-management",
            element: <MBOManagementPage />,
          },
          {
            path: "mbo-management/:mboId",
            element: <MBOManagementDetailsPage />,
          },
          {
            path: "users",
            element: <UserManagementPage />,
          },
          // { path: "outlet/:outletId/details", element: <OutletDetailsPage /> },
          // Add more dealer-scoped children using ROUTES as needed
        ],
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
    ],
  },
];
