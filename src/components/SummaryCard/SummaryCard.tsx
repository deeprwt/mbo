import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export interface SummaryCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  change: string;
  changeColor: string;
  subtext: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  icon,
  color,
  change,
  changeColor,
  subtext,
}) => (
  <Box
    sx={{
      flex: "1 1 0",
      minWidth: {
        xs: "100%",
        sm: "calc(50% - 1rem)",
        md: "calc(25% - 1.5rem)",
      },
      maxWidth: { xs: "100%", sm: "22rem", md: "22rem" },
      display: "flex",
    }}
  >
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: "1rem",
        boxShadow:
          "2px 4px 16px 0px rgba(0,0,0,0.06), 4px 0px 12px 0px rgba(0,0,0,0.04)",
        p: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "10rem",
        gap: "0.75rem",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: color,
          fontWeight: 700,
          fontSize: "1.1rem",
          mb: "0.5rem",
          letterSpacing: 0,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Box
          sx={{
            fontSize: "2rem",
            color: color,
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#222",
            fontSize: "2.2rem",
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: changeColor,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {change}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#BDBDBD", fontWeight: 500, fontSize: 14 }}
        >
          {subtext}
        </Typography>
      </Box>
    </Paper>
  </Box>
);
