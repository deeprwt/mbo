import { createTheme } from "@mui/material/styles";

const shadows: [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  "none",
  "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  "2px 4px 16px 0px rgba(0,0,0,0.06), 4px 0px 12px 0px rgba(0,0,0,0.04)",
  ...Array(22).fill("none"),
] as [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E353A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFC0C0",
    },
    background: {
      default: "rgba(0,0,0,0.04)",
      paper: "#fff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "#919191",
      disabled: "#C6C6C6",
    },
    error: { main: "#D32F2F" },
    success: { main: "#64DD17" },
    warning: { main: "#F44336" },
    grey: {
      100: "#D4D4D4",
      200: "#C6C6C6",
      300: "#E0E0E0",
      400: "#919191",
      500: "#9E9E9E",
    },
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 16,
    fontWeightRegular: 400,
    h6: {
      fontWeight: 700,
      fontSize: 22,
    },
    body2: {
      fontWeight: 400,
      fontSize: 13,
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows,
});

export default theme;

export const STATUS_COLORS = {
  active: "#64DD17",
  inactive: "#9E9E9E",
  draft: "#757575",
  suspended: "#F44336",
};
