import { Paper, Typography, Chip, Box, useTheme } from "@mui/material";
import { STATUS_COLORS } from "@/theme";

export interface MBOStatusCardProps {
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

export const MBOStatusCard = ({ mbo }: MBOStatusCardProps) => {
  const theme = useTheme();
  const statusKey = mbo.status.toLowerCase() as keyof typeof STATUS_COLORS;
  const statusColor = STATUS_COLORS[statusKey] || theme.palette.grey[400];
  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: theme.shadows[1] }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Chip
            label={mbo.status}
            sx={{
              bgcolor: statusColor,
              color: "#fff",
              fontWeight: 500,
              mb: 1,
              borderRadius: "100px",
            }}
          />
          <Typography variant="body2" color={theme.palette.grey[500]}>
            Code • {mbo.code}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.primary}>
            Address: {mbo.address}
            <br />
            <b>Name:</b> {mbo.owner}
            <br />
            <b>Contact:</b> {mbo.contact}
            <br />
            <b>GSTIN:</b> {mbo.gstin}
          </Typography>
        </Box>
        <Typography variant="body2" color={theme.palette.grey[500]}>
          From {mbo.date}
        </Typography>
      </Box>
    </Paper>
  );
};
