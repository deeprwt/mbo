import { Paper, Typography, Button, Chip, Box, useTheme } from "@mui/material";
import { STATUS_COLORS } from "@/theme";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { ROUTES } from "@/constants/routes";

export interface MBOCardProps {
  mbo: {
    name: string;
    code: string;
    date: string;
    address: string;
    owner: string;
    contact: string;
    gstin: string;
    status: string;
  };
}

export const MBOCard = ({ mbo }: MBOCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUserData();
  const params = useParams<{ dealerId?: string }>();

  // Get dealerId from either route params or user context
  const dealerId = params.dealerId || user?.dealershipId || "default";

  const statusKey = mbo.status.toLowerCase() as keyof typeof STATUS_COLORS;
  const statusColor = STATUS_COLORS[statusKey] || theme.palette.grey[400];

  const handleViewClick = () => {
    // Use ROUTES constant for consistent path generation
    const detailPath = ROUTES.MBO_MANAGEMENT_DETAILS.path(dealerId, mbo.code);
    console.log(`🔗 Navigating to MBO details: ${detailPath}`);
    navigate(detailPath);
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        minWidth: 300,
        maxWidth: 350,
        bgcolor: theme.palette.background.paper,
        flex: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontWeight={700}
          color={theme.palette.error.main}
          fontSize={16}
        >
          {mbo.name}
        </Typography>
        <Chip
          label={mbo.status}
          sx={{
            bgcolor: statusColor,
            color: "#fff",
            borderRadius: "100px",
            fontWeight: 500,
            fontSize: 13,
            height: 24,
            textTransform: "capitalize",
          }}
          size="small"
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Typography variant="body2" color={theme.palette.grey[500]}>
          Code • {mbo.code}
        </Typography>
        <Typography variant="body2" color={theme.palette.grey[500]}>
          From• {mbo.date}
        </Typography>
      </Box>
      <Typography variant="body2" color={theme.palette.text.primary} mt={1}>
        <b>Address:</b> {mbo.address}
        <br />
        <b>Name:</b> {mbo.owner}
        <br />
        <b>Contact:</b> {mbo.contact}
        <br />
        <b>GSTIN:</b> {mbo.gstin}
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: theme.palette.grey[300],
          color: "#000",
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          fontWeight: 500,
        }}
        onClick={handleViewClick}
      >
        View
      </Button>
    </Paper>
  );
};
