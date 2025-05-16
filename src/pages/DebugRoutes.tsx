import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import { usePermission } from "@/contexts/PermissionContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { protectedRoutes } from "@/routes";
import { ROUTE_PERMISSIONS, ROUTES } from "@/constants/routes";
import { useState } from "react";
import { RouteConfig } from "@/routes/RouteConfig";

// Define a type for route objects
interface RouteObject {
  path: string;
  children?: RouteObject[];
}

export const DebugRoutes = () => {
  const { authorizedRoutes, checkRouteAccess } = usePermission();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserData();
  const params = useParams();
  const [testDealerId, setTestDealerId] = useState(user?.dealershipId || "");
  const [testMboId, setTestMboId] = useState("test-mbo-id");

  // Flatten protected routes for display
  const flattenRoutes = (routes: RouteObject[], parentPath = ""): string[] => {
    return routes.reduce((acc: string[], route: RouteObject) => {
      const path = `${parentPath}${route.path}`;
      acc.push(path);
      if (route.children) {
        acc.push(...flattenRoutes(route.children, path));
      }
      return acc;
    }, []);
  };

  // Get all registered routes
  const allRoutes = flattenRoutes(protectedRoutes as RouteObject[]);

  // Check current route's permissions
  const currentRoutePermissions = Object.entries(ROUTE_PERMISSIONS).find(
    ([routePath]) => {
      if (routePath.includes(":")) {
        const routeRegex = new RegExp(
          "^" + routePath.replace(/:\w+/g, "[^/]+") + "$"
        );
        return routeRegex.test(location.pathname);
      }
      return routePath === location.pathname;
    }
  );

  const hasAccessToCurrentRoute = checkRouteAccess(location.pathname);

  // Test navigation to a specific route
  const testNavigation = (path: string) => {
    console.log(`🧪 Testing navigation to: ${path}`);
    navigate(path);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Route Debugging
      </Typography>

      {/* Include the RouteConfig component with debug mode enabled */}
      <RouteConfig debugMode={true} />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Route
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="Path" secondary={location.pathname} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Params"
              secondary={JSON.stringify(params, null, 2)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Permissions Required"
              secondary={
                currentRoutePermissions
                  ? JSON.stringify(currentRoutePermissions[1])
                  : "None"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Has Access"
              secondary={hasAccessToCurrentRoute ? "Yes" : "No"}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="User ID"
              secondary={user?.id || "No user ID"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="User Name"
              secondary={user?.name || "No user name"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Dealership ID"
              secondary={user?.dealershipId || "No dealership ID"}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Authorized Routes
        </Typography>
        <List dense>
          {authorizedRoutes.map((route) => (
            <ListItem key={route.path}>
              <ListItemText primary={route.label} secondary={route.path} />
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(route.path)}
              >
                Navigate
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Registered Routes
        </Typography>
        <List dense>
          {allRoutes.map((route) => (
            <ListItem key={route}>
              <ListItemText primary={route} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Route Permission Mapping
        </Typography>
        <List dense>
          {Object.entries(ROUTE_PERMISSIONS).map(([route, permissions]) => (
            <ListItem key={route}>
              <ListItemText
                primary={route}
                secondary={JSON.stringify(permissions)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Navigation
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Dealer ID"
            value={testDealerId}
            onChange={(e) => setTestDealerId(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="MBO ID"
            value={testMboId}
            onChange={(e) => setTestMboId(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Button
            variant="contained"
            onClick={() => testNavigation("/home")}
            color="primary"
          >
            Home
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              testNavigation(ROUTES.MBO_MANAGEMENT.path(testDealerId))
            }
            color="primary"
            disabled={!testDealerId}
          >
            MBO Management
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              testNavigation(
                ROUTES.MBO_MANAGEMENT_DETAILS.path(testDealerId, testMboId)
              )
            }
            color="primary"
            disabled={!testDealerId || !testMboId}
          >
            MBO Details
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              testNavigation(ROUTES.USER_MANAGEMENT.path(testDealerId))
            }
            color="primary"
            disabled={!testDealerId}
          >
            User Management
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DebugRoutes;
