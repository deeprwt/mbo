import React from "react";
import { Typography, Box, Paper } from "@mui/material";

export const UserManagementPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          This is the User Management page. Content will be added here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default UserManagementPage;
