import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import type { IQuickActionUIInterface } from "@/types";
import { QuickActionButton } from "./QuickActionButton";
interface QuickActionCardProps {
  quickActions: IQuickActionUIInterface[];
}

export const QuickActionCard = ({ quickActions }: QuickActionCardProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        p: "2rem",

        minHeight: "10rem",
        gap: "1.5rem",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          alignSelf: "flex-start",
          color: "#D32F2F",
          fontWeight: 700,
          fontSize: "1.1rem",
          mb: "0.5rem",
          letterSpacing: 0,
        }}
      >
        Quick Actions
      </Typography>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          width: "70%",
        }}
      >
        {quickActions.map((action) => (
          <QuickActionButton key={action.label} action={action} />
        ))}
      </Box>
    </Paper>
  );
};
