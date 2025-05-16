import { Box, Button, Typography } from "@mui/material";
import React from "react";
import type { IQuickActionUIInterface } from "@/types";

interface QuickActionButtonProps {
  action: IQuickActionUIInterface;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  action,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        key={action.label}
        variant="contained"
        size="large"
        sx={{
          bgcolor: "var(--grey-300, #E0E0E0)",
          color: "#000000",
          borderRadius: "50%",
          minWidth: 0,
          width: "7rem",
          height: "7rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 2px 8px rgba(211,47,47,0.08)",
          m: 1,
          "& .MuiSvgIcon-root": {
            fontSize: "3rem", // or any size you want
          },
          //   "&:hover": { bgcolor: "#B71C1C" },
        }}
      >
        {action.icon}
      </Button>
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          color: "#919191",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {action.label}
      </Typography>
    </Box>
  );
};
