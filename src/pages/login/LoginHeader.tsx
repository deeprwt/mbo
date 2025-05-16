import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import buildings from "../../assets/login/Builidings.png";

const LoginHeader = () => (
  <AppBar
    position="static"
    elevation={0}
    sx={{
      bgcolor: "#fff",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "none",
      zIndex: 1,
    }}
  >
    <Toolbar sx={{ position: "relative", minHeight: 80, px: { xs: 2, md: 8 } }}>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: "#222", fontWeight: 700, fontSize: 22 }}
        >
          Dealer Management
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#b0b0b0", fontWeight: 400, fontSize: 13 }}
        >
          Powered by Vizionforge
        </Typography>
      </Box>
      {/* Overlapping buildings image */}
      <Box
        component="img"
        src={buildings}
        alt="Buildings Illustration"
        sx={{
          position: "absolute",
          right: 0,
          top: { xs: 10, md: -30 },
          height: { xs: 60, md: 100 },
          width: { xs: 180, md: 320 },
          zIndex: 2,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </Toolbar>
  </AppBar>
);

export default LoginHeader;
