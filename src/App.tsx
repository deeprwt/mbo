import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProviders } from "@/contexts";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { lazy } from "react";

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const MBOManagementPage = lazy(
  () => import("@/pages/mbo-management/MBOManagementPage")
);
const MBOManagementDetailsPage = lazy(
  () => import("@/pages/MBOManagementDetailsPage/MBOManagementDetailsPage")
);
const UserManagementPage = lazy(
  () => import("@/pages/users/UserManagementPage")
);
const UnauthorizedPage = lazy(
  () => import("@/pages/unauthorized/UnauthorizedPage")
);

function App() {
  return (
    <AppProviders>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Login route with restricted access */}
          <Route element={<PublicRoute restricted={true} />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              {/* Default route redirects to home */}
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="unauthorized" element={<UnauthorizedPage />} />

              {/* Dealer routes */}
              <Route path="dealer/:dealerId">
                {/* Default dealer route redirects to mbo-management */}
                <Route
                  index
                  element={<Navigate to="mbo-management" replace />}
                />
                <Route path="mbo-management">
                  {/* MBO Management index */}
                  <Route index element={<MBOManagementPage />} />
                  {/* MBO Management detail with ID */}
                  <Route path=":mboId" element={<MBOManagementDetailsPage />} />
                </Route>
                <Route path="users" element={<UserManagementPage />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
