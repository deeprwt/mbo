// import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { MBOFileAttachment } from "@/components/MBOFileAttachment";

export const MBOFormSection = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gridTemplateRows: { xs: "auto", sm: "1fr 1fr" },
          width: "100%",
          gap: "2rem",
          mb: "2rem",
        }}
      >
        {/* Row 1 */}
        <Box>
          <TextField label="MBO name *" value="John" fullWidth />
        </Box>
        <Box>
          <TextField label="GST No *" fullWidth />
        </Box>
        {/* Row 2 */}
        <Box>
          <TextField
            label="Address *"
            error
            helperText="Helper text"
            fullWidth
          />
        </Box>
        <Box>
          <TextField label="Email ID" fullWidth />
        </Box>
        {/* Row 3 */}
        <Box>
          <TextField label="Contact Person Name 1 *" value="Value" fullWidth />
        </Box>
        <Box>
          <TextField label="Contact Number 1 *" value="414 141 414" fullWidth />
        </Box>
        {/* Row 4 */}
        <Box>
          <TextField label="Contact Person Name 2 *" value="Value" fullWidth />
        </Box>
        <Box>
          <TextField label="Contact Number 2 *" value="414 141 414" fullWidth />
        </Box>
      </Box>

      {/* Document Upload - Full Width */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight={500} mb={1}>
          KYC Document Upload *
        </Typography>
        <MBOFileAttachment />
      </Box>
    </Box>
  );
};
