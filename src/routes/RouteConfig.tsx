import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_PERMISSIONS } from "@/constants/routes";
import { useUserData } from "@/hooks/useUserData";
import { usePermission } from "@/contexts/PermissionContext";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

interface RouteConfigProps {
  debugMode?: boolean;
}

/**
 * RouteConfig provides a central component for route configuration and debugging
 */
export const RouteConfig: React.FC<RouteConfigProps> = ({
  debugMode = false,
}) => {
  const [testDealerId, setTestDealerId] = React.useState("");
  const [testMboId, setTestMboId] = React.useState("");
  const { user } = useUserData();
  const { checkRouteAccess } = usePermission();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Use user's dealership ID if available
  React.useEffect(() => {
    if (user?.dealershipId) {
      setTestDealerId(user.dealershipId);
    }
  }, [user]);

  // List all registered route patterns
  const routePatterns = Object.keys(ROUTE_PERMISSIONS);

  // Check if the current route is matched by a route pattern
  const matchedPattern = routePatterns.find((pattern) => {
    if (pattern.includes(":")) {
      const regexPattern = pattern.replace(/:\w+/g, "[^/]+");
      const routeRegex = new RegExp("^" + regexPattern + "$");
      return routeRegex.test(location.pathname);
    }
    return pattern === location.pathname;
  });

  // Check if the current route is accessible
  const hasAccess = checkRouteAccess(location.pathname);

  // If debug mode is enabled, return debug info
  if (debugMode) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Route Configuration Debug
        </Typography>

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
                primary="Matched Pattern"
                secondary={matchedPattern || "None"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Has Access"
                secondary={hasAccess ? "Yes" : "No"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Route Params"
                secondary={JSON.stringify(params, null, 2)}
              />
            </ListItem>
          </List>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Navigation Test
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
            {Object.entries(ROUTES).map(([key, route]) => {
              // Handle different route path types
              if (key === "MBO_MANAGEMENT" || key === "USER_MANAGEMENT") {
                // Routes that take dealerId only
                return (
                  <Button
                    key={key}
                    variant="contained"
                    size="small"
                    disabled={!testDealerId}
                    onClick={() => {
                      const pathFn = route.path as (dealerId: string) => string;
                      navigate(pathFn(testDealerId));
                    }}
                  >
                    {route.label}
                  </Button>
                );
              } else if (
                key === "MBO_MANAGEMENT_DETAILS" ||
                key === "OUTLET_DETAILS"
              ) {
                // Routes that take dealerId and a second parameter
                return (
                  <Button
                    key={key}
                    variant="contained"
                    size="small"
                    disabled={!testDealerId || !testMboId}
                    onClick={() => {
                      const pathFn = route.path as (
                        dealerId: string,
                        secondId: string
                      ) => string;
                      navigate(pathFn(testDealerId, testMboId));
                    }}
                  >
                    {route.label}
                  </Button>
                );
              } else {
                // Static paths like HOME and DEBUG
                return (
                  <Button
                    key={key}
                    variant="contained"
                    size="small"
                    onClick={() => navigate(route.path as string)}
                  >
                    {route.label}
                  </Button>
                );
              }
            })}
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Route Permissions
          </Typography>
          <List dense>
            {Object.entries(ROUTE_PERMISSIONS).map(([path, permissions]) => (
              <ListItem key={path}>
                <ListItemText
                  primary={path}
                  secondary={permissions.join(", ")}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    );
  }

  // If not in debug mode, just render routes normally
  return null;
};

export default RouteConfig;
