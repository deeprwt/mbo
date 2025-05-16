import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { MBOStatusCard } from "@/components/MBOStatusCard";
import { MBOFormSection } from "@/components/MBOFormSection";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MBOWalletSection } from "@/components/MBOWalletSection";
import { RolesAndUsersSection } from "@/components/RolesAndUsersSection";

const MBOManagementDetailsPage = () => {
  const theme = useTheme();
  const steps = ["Details", "MBO Wallet", "Roles & Users"];
  const [activeStep, setActiveStep] = React.useState(0);

  // Dummy data for now
  const mbo = {
    name: "Krishna MBO",
    code: "BM1243",
    date: "4 Feb 2025",
    address:
      "123 Main Street, Bangalore, Karnataka, Bangalore, Karnataka 560001",
    owner: "9876543210",
    contact: "9876543210",
    gstin: "NJHGFD345678909",
    status: "Active",
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          fontWeight={700}
        >
          {mbo.name}
        </Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }}>
            Edit
          </Button>
          <Button variant="contained" color="error">
            Remove
          </Button>
        </Box>
      </Box>
      <MBOStatusCard mbo={mbo} />
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === 0 && <MBOFormSection mbo={mbo} />}
        {activeStep === 1 && <MBOWalletSection />}
        {activeStep === 2 && <RolesAndUsersSection />}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
            variant="outlined"
            sx={{ minWidth: 100, borderRadius: 2 }}
          >
            Back
          </Button>
          <Button
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep((prev) => prev + 1)}
            variant="contained"
            color="error"
            sx={{ minWidth: 100, borderRadius: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MBOManagementDetailsPage;
