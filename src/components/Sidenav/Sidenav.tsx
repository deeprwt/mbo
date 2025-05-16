import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  styled,
  Badge,
  IconButton,
} from "@mui/material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { useAuth } from "@/contexts/useAuth";
import { usePermission } from "@/contexts/PermissionContext";
import bhagath from "../../assets/login/bhagath-motors.png";


export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidenavProps {
  navItems: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

/**
 * Extract initials from a name
 * @param name Full name to extract initials from
 * @returns Up to 2 character initials (e.g. "John Doe" -> "JD")
 */
const getInitials = (name: string): string => {
  if (!name) return "U";

  // Split the name by spaces and get the first character of each part
  const parts = name.split(" ").filter((part) => part.length > 0);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  // Get first character of first and last parts
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Sidenav: React.FC<SidenavProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navItems: providedNavItems,
  currentPath,
  onNavigate,
}) => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const { authorizedRoutes } = usePermission();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect happens in logout function
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNav = (path: string) => {
    console.log(`🚀 Sidenav - Navigating to: ${path}`);

    // For dealer-scoped paths, ensure we're using the correct format
    if (path.includes("/dealer/")) {
      console.log(`🔍 Dealer-scoped path detected: ${path}`);
    }

    // Use the provided navigate function from props
    onNavigate(path);

    // Log completion
    console.log(`✅ Navigation attempt completed for: ${path}`);
  };

  // Use the filtered routes from PermissionContext
  const displayNavItems = authorizedRoutes;

  // Get user's initials for avatar
  const userInitials = getInitials(user?.name || "");

  return (
    <Box
      sx={{
        width: { md: "20%", lg: "15%" },
        flexShrink: 0,
        bgcolor: "#fff",
        boxShadow: theme.shadows[1],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        p: { xs: 0, sm: "1.5rem" },
        position: "relative",
      }}
    >
      {/* Top: Logo/Title */}
      {/* <Box sx={{ mb: "2rem" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: "1.25rem", color: "#222" }}
        >
          Dealer Management
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#b0b0b0", fontSize: "0.85rem" }}
        >
          Powered by Vizionforge
        </Typography>
      </Box> */}
            <Box
        component="img"
        src={bhagath}
        alt="Buildings Illustration"
        sx={{
          // position: "absolute",
          // right: 0,
          // top: { xs: 10, md: -30 },
          // height: { xs: 60, md: 100 },
          // width: { xs: 180, md: 320 },
          zIndex: 2,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Navigation */}
      <Box sx={{ flex: 1 }}>
        {displayNavItems.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Box
              key={item.label}
              onClick={() => handleNav(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                bgcolor: isActive ? "#ffe0e0" : "transparent",
                borderRadius: "0.5rem",
                px: "1rem",
                py: "0.75rem",
                mb: "0.5rem",
                color: isActive ? theme.palette.error.main : "#222",
                fontWeight: isActive ? 700 : 400,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              {item.icon}
              <Typography
                variant="body1"
                sx={{ fontWeight: isActive ? 700 : 400, fontSize: "1rem" }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* Divider above user info */}
      <Box sx={{ width: "100%", mt: "auto", mb: 2 }}>
        <Box sx={{ borderTop: "1px solid #e0e0e0", my: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            pl: 1,
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                bgcolor: "#eee",
                color: "#222",
              }}
            >
              {userInitials}
            </Avatar>
          </StyledBadge>
          <Box>
            <Typography variant="body1" sx={{ color: "#222" }}>
              {user?.name || "User"}
            </Typography>
          </Box>
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutSharpIcon color="error" />
          </IconButton>
        </Box>
      </Box>
      {/* Vertical Divider */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          bgcolor: "#e0e0e0",
        }}
      />
    </Box>
  );
};
