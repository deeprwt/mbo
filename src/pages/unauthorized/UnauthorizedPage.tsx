import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/contexts/PermissionContext";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { getFirstAuthorizedRoute } = usePermission();

  const handleRedirect = () => {
    const firstAvailableRoute = getFirstAuthorizedRoute();
    navigate(firstAvailableRoute);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "50vh",
        padding: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph align="center">
        You don't have permission to access this page. Please contact your
        administrator if you believe you should have access.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        sx={{ mt: 2 }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
