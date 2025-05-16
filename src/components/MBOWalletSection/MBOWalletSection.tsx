import React from "react";
import {
  Box,
  Typography,
  Paper,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  WALLET_DEPOSIT_PRESET,
  WALLET_DEPOSIT_LABEL,
  WALLET_DEPOSIT_DESCRIPTION,
  CREDIT_LIMIT_PRESET,
  CREDIT_LIMIT_LABEL,
  CREDIT_LIMIT_DESCRIPTION,
} from "@/constants/wallet";

export type MBOWalletSectionProps = object;

export const MBOWalletSection: React.FC<MBOWalletSectionProps> = () => {
  const theme = useTheme();
  const [depositEnabled, setDepositEnabled] = React.useState(true);
  const [creditEnabled, setCreditEnabled] = React.useState(true);
  const [depositAmount, setDepositAmount] = React.useState("");
  const [creditAmount, setCreditAmount] = React.useState("");

  return (
    <Box>
      {/* Wallet Deposit Pre-set Limit */}
      <Typography
        variant="body1"
        fontWeight={500}
        mb={1}
        color={theme.palette.text.primary}
      >
        1. {WALLET_DEPOSIT_LABEL}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CurrencyRupeeIcon color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color={theme.palette.text.primary}
            >
              {WALLET_DEPOSIT_PRESET}
              <Typography
                component="span"
                variant="subtitle2"
                fontWeight={500}
                ml={0.5}
              >
                Lakhs
              </Typography>
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {WALLET_DEPOSIT_DESCRIPTION}
            </Typography>
          </Box>
        </Box>
        <Switch
          checked={depositEnabled}
          onChange={() => setDepositEnabled((v) => !v)}
          color="success"
          sx={{ ml: 2 }}
        />
      </Paper>
      <TextField
        label="Wallet Deposit Amount"
        placeholder="Enter Amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!depositEnabled}
      />

      {/* Credit Limit Pre-set */}
      <Typography
        variant="body1"
        fontWeight={500}
        mb={1}
        mt={4}
        color={theme.palette.text.primary}
      >
        2. {CREDIT_LIMIT_LABEL}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CurrencyRupeeIcon color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color={theme.palette.text.primary}
            >
              {CREDIT_LIMIT_PRESET}
              <Typography
                component="span"
                variant="subtitle2"
                fontWeight={500}
                ml={0.5}
              >
                Lakhs
              </Typography>
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {CREDIT_LIMIT_DESCRIPTION}
            </Typography>
          </Box>
        </Box>
        <Switch
          checked={creditEnabled}
          onChange={() => setCreditEnabled((v) => !v)}
          color="success"
          sx={{ ml: 2 }}
        />
      </Paper>
      <TextField
        label="New Credit Limit"
        placeholder="Enter Amount"
        value={creditAmount}
        onChange={(e) => setCreditAmount(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!creditEnabled}
      />
    </Box>
  );
};
