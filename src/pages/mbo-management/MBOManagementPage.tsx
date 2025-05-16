import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  useTheme,
  CircularProgress,
  Grid,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MBOCard } from "@/components/MBOCard/MBOCard";
import { useOutletService } from "@/services/MBOService";
import { useState, useEffect, useRef } from "react";
import type { Outlet } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { ROUTES } from "@/constants/routes";

// Type for mapping Outlet data to MBO card format
interface MBOCardData {
  name: string;
  code: string;
  date: string;
  address: string;
  owner: string;
  contact: string;
  gstin: string;
  status: string;
}

export const MBOManagementPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getMBOOutlets } = useOutletService();
  const [loading, setLoading] = useState(true);
  const [mboList, setMboList] = useState<Outlet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user } = useAuth();
  const params = useParams<{ dealerId?: string }>();

  // Get dealerId from either route params or user context
  const dealerId = params.dealerId || user?.dealershipId || "default";

  // Use ref to prevent duplicate data fetching
  const dataFetchedRef = useRef(false);

  // Simple useEffect with auth check and ref guard
  useEffect(() => {
    // Only fetch once and only if authenticated
    if (!dataFetchedRef.current && isAuthenticated) {
      const fetchMBOs = async () => {
        try {
          setLoading(true);
          const response = await getMBOOutlets();
          if (response?.data) {
            setMboList(response.data as Outlet[]);
          }
        } catch (error) {
          console.error("Failed to fetch MBO outlets:", error);
        } finally {
          setLoading(false);
          dataFetchedRef.current = true;
        }
      };

      fetchMBOs();
    }
  }, [isAuthenticated]); // Only depend on authentication state

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Convert Outlet data to MBO card format
  const mapOutletToMBOCardData = (outlet: Outlet): MBOCardData => {
    return {
      name: outlet.name,
      code: outlet.id, // Using ID as code since Outlet doesn't have a code property
      date: new Date(outlet.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      address: `${outlet.address.street}, ${outlet.address.city}, ${outlet.address.state}, ${outlet.address.pincode}`,
      owner: outlet.contactPerson || "N/A",
      contact: outlet.contactPhone || "N/A",
      gstin: (outlet.metadata?.gstin as string) || "N/A", // Assuming GSTIN might be in metadata
      status: outlet.status,
    };
  };

  const filteredMBOs = mboList.filter(
    (outlet) =>
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Typography
        variant="h4"
        fontWeight={700}
        color={theme.palette.error.main}
        mb={2}
      >
        MBO List
      </Typography>
      <Box display="flex" alignItems="center" mb={2} gap={2}>
        <TextField
          placeholder="Name, Code ..."
          variant="outlined"
          size="small"
          sx={{ minWidth: 300 }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IconButton sx={{ bgcolor: "#FFCCCC", border: "1px solid #FFC0C0" }}>
          <FilterAltIcon sx={{ color: "#F44336" }} />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.error.main,
            color: "#fff",
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            fontWeight: 500,
          }}
          onClick={() =>
            navigate(ROUTES.MBO_MANAGEMENT.path(dealerId) + "/create")
          }
        >
          Create MBO
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress color="error" />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredMBOs.length > 0 ? (
            filteredMBOs.map((outlet) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={outlet.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MBOCard mbo={mapOutletToMBOCardData(outlet)} />
              </Grid>
            ))
          ) : (
            <Box width="100%" textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No MBOs found matching your search criteria.
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </>
  );
};

export default MBOManagementPage;
