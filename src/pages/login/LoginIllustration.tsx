import React from "react";
import Box from "@mui/material/Box";
import heroIllustration from "../../assets/login/hero-illustration.png";

const LoginIllustration = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#fafbfc",
      border: "1px solid #e0e0e0",
      borderRadius: 2,
      maxWidth: 600,
      width: "40vw",
      minWidth: 320,
      height: "auto",
      boxSizing: "border-box",
      m: { xs: 0, md: 2 },
    }}
  >
    <Box
      component="img"
      src={heroIllustration}
      alt="Login Hero Illustration"
      sx={{ width: "100%", height: "auto", objectFit: "contain" }}
    />
  </Box>
);

export default LoginIllustration;
