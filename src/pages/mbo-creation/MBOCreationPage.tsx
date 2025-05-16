import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import TwoWheelerSharpIcon from "@mui/icons-material/TwoWheelerSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import SecuritySharpIcon from "@mui/icons-material/SecuritySharp";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import {
  WelcomeCard,
  SummaryCard,
  QuickActionCard,
  DealerChart,
} from "@/components";
import { useUserData } from "@/hooks";
import { useDealershipService } from "@/services";
import type { DashboardSummary } from "@/services";
import { useAuth } from "@/contexts/useAuth";

// Quick actions for dashboard navigation
const quickActions = [
  {
    label: "Create MBO",
    icon: <AddCircleSharpIcon />,
    path: "/mbo/create",
  },
  {
    label: "MBO List",
    icon: <FormatListBulletedSharpIcon />,
    path: "/mbo/list",
  },
  {
    label: "Vehicle list",
    icon: <TwoWheelerSharpIcon />,
    path: "/vehicles",
  },
  {
    label: "MBO Permissions",
    icon: <SecuritySharpIcon />,
    path: "/permissions",
  },
];

// Sample chart data
const chartData = [
  { name: "Jan", dealers: 30 },
  { name: "Feb", dealers: 45 },
  { name: "Mar", dealers: 60 },
  { name: "Apr", dealers: 50 },
  { name: "May", dealers: 80 },
  { name: "Jun", dealers: 70 },
];

// Default dashboard data
const defaultDashboardData: DashboardSummary = {
  totalMbo: 0,
  inventoryValue: "0",
  totalInventory: 0,
  inventoryDays: 0,
  changeRates: {
    mboChange: "+0%",
    inventoryValueChange: "+0%",
    totalInventoryChange: "+0%",
    daysChange: "+0%",
  },
};

const MBOCreationPage = () => {
  const theme = useTheme();
  const { user, role } = useUserData();
  const { isAuthenticated } = useAuth();
  const dealershipService = useDealershipService();

  // Use refs to track loading state and prevent infinite loops
  const dataFetchedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);

  // Simple one-time effect to load data
  useEffect(() => {
    // Only fetch once and only if authenticated
    if (!dataFetchedRef.current && isAuthenticated) {
      try {
        // Get static dashboard data
        const data = dealershipService.getDashboardSummary();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
        dataFetchedRef.current = true;
      }
    }
  }, [isAuthenticated]); // Only depend on authentication state

  // Generate summary cards from dashboard data
  const summaryCards = [
    {
      label: "Total MBO",
      value: dashboardData.totalMbo,
      icon: <GroupIcon />,
      color: "#D32F2F",
      change: dashboardData.changeRates.mboChange,
      changeColor: dashboardData.changeRates.mboChange.startsWith("+")
        ? "#64DD17"
        : "#F44336",
      subtext: "This Month",
    },
    {
      label: "Inventory Value",
      value: dashboardData.inventoryValue,
      icon: <HomeIcon />,
      color: "#D32F2F",
      change: dashboardData.changeRates.inventoryValueChange,
      changeColor: dashboardData.changeRates.inventoryValueChange.startsWith(
        "+"
      )
        ? "#64DD17"
        : "#F44336",
      subtext: "This Month",
    },
    {
      label: "Total Inventory",
      value: dashboardData.totalInventory,
      icon: <HomeIcon />,
      color: "#D32F2F",
      change: dashboardData.changeRates.totalInventoryChange,
      changeColor: dashboardData.changeRates.totalInventoryChange.startsWith(
        "+"
      )
        ? "#64DD17"
        : "#F44336",
      subtext: "This Month",
    },
    {
      label: "Inventory Days",
      value: dashboardData.inventoryDays,
      icon: <HomeIcon />,
      color: "#D32F2F",
      change: dashboardData.changeRates.daysChange,
      changeColor: dashboardData.changeRates.daysChange.startsWith("+")
        ? "#64DD17"
        : "#F44336",
      subtext: "Max Days Vehicle in Inventory",
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Dashboard Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: theme.palette.error.main,
          mb: "1.5rem",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Dashboard
      </Typography>
      {/* Welcome Card - Using actual user data */}
      <WelcomeCard userName={user?.name || "User"} userRole={role || "User"} />
      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gridTemplateRows: { xs: "auto", sm: "1fr 1fr" },
            gap: "2rem",
            mb: "2rem",
            width: "45%",
            justifyContent: "center",
          }}
        >
          {summaryCards.map((card) => (
            <SummaryCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
              color={card.color}
              change={card.change}
              changeColor={card.changeColor}
              subtext={card.subtext}
            />
          ))}
        </Box>
        {/* Quick Actions Card */}
        <Box
          key="quick-actions"
          sx={{
            display: "flex",
            width: "45%",
          }}
        >
          <QuickActionCard quickActions={quickActions} />
        </Box>
      </Box>
      {/* Dealers Chart */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: "1.5rem", md: "2rem" },
          borderRadius: "0.75rem",
          minHeight: "18rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.error.main, fontWeight: 700, mb: 2 }}
        >
          Dealers
        </Typography>
        <DealerChart chartData={chartData} />
      </Paper>
    </>
  );
};

export default MBOCreationPage;
