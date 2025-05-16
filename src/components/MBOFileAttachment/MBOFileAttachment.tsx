import { Box, Typography, IconButton, useTheme } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";

export const MBOFileAttachment = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 2,
      }}
    >
      <CloudDownloadIcon color="primary" />
      <Box>
        <Typography>document_file_name.pdf</Typography>
        <Typography variant="caption" color="text.secondary">
          100kb
        </Typography>
      </Box>
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
