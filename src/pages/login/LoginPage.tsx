import React from "react";
import { Box, Grid } from "@mui/material";
import LoginHeader from "./LoginHeader";
import LoginIllustration from "./LoginIllustration";
import LoginForm from "./LoginForm";

const LoginPage = () => (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f7fafa", width: "100vw" }}>
    <LoginHeader />
    <Grid
      container
      sx={{
        minHeight: "calc(100vh - 80px)",
        px: { xs: 2, md: 8 },
        py: 4,
      }}
      alignItems="center"
      justifyContent="center"
      spacing={8}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <LoginIllustration />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  </Box>
);

export default LoginPage;
