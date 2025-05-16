import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/contexts/useAuth";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      // Error is already handled in the AuthContext
      console.error("Login failed in component", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        minWidth: 320,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 3,
        boxSizing: "border-box",
      }}
    >
      <TextField
        label="Email address"
        name="email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        error={!!error}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        error={!!error}
        helperText={error ? error : ""}
        InputLabelProps={{ shrink: true }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
        <Link
          href="#"
          underline="hover"
          sx={{ color: "#3366ff", fontSize: 14 }}
        >
          Forget Password?
        </Link>
      </Box>
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 2,
          borderRadius: 2,
          fontWeight: 600,
          bgcolor: "#111",
          "&:hover": { bgcolor: "#222" },
          height: 48,
        }}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
      </Button>
    </Box>
  );
};

export default LoginForm;
