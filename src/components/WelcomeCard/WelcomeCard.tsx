import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export interface WelcomeCardProps {
  userName: string;
  userRole: string;
  illustration?: React.ReactNode;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName,
  userRole,
  illustration,
}) => (
  <Paper
    elevation={1}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "#ffe0e0",
      borderRadius: "0.75rem",
      p: { xs: "1.5rem", md: "2rem" },
      mb: "2rem",
      flexWrap: "wrap",
      minHeight: "7rem",
    }}
  >
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ color: "#b0b0b0", fontWeight: 700, fontSize: "1.25rem" }}
      >
        Welcome
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#D32F2F",
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        {/* {userName} */}
        Hitesh
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#222", fontWeight: 500, mb: 1 }}
      >
        {/* {userRole} */}
        MBO Operator
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#222",
          fontWeight: 700,
          mt: 1,
          fontSize: { xs: "1.1rem", md: "1.25rem" },
        }}
      >
        {/* Lets Approve Pending and move forward */}
        Any New Thing going on Catch up to trend
      </Typography>
    </Box>
    {/* Illustration or Placeholder */}
    <Box
      sx={{
        width: { xs: "8rem", md: "16rem" },
        height: { xs: "6rem", md: "8rem" },
        bgcolor: "#f8bbd0",
        borderRadius: "0.5rem",
        ml: { md: "2rem" },
        mt: { xs: "1rem", md: 0 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {illustration}
    </Box>
  </Paper>
);
