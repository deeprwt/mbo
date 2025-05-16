import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Divider,
  FormGroup,
} from "@mui/material";
import type { Role, Permission } from "@/types";
import { useRoleActions } from "@/hooks/useRoleActions";

interface RoleFormProps {
  open: boolean;
  onClose: () => void;
  role?: Role;
  availablePermissions: Permission[];
  onSuccess?: () => void;
}

export const RoleForm: React.FC<RoleFormProps> = ({
  open,
  onClose,
  role,
  availablePermissions,
  onSuccess,
}) => {
  const { createRole, updateRole } = useRoleActions();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  // Initialize form when role changes
  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setIsActive(role.isActive);
      setSelectedPermissions(role.permissions.map((p) => p.id));
    } else {
      // Initialize for new role
      setName("");
      setDescription("");
      setIsActive(true);
      setSelectedPermissions([]);
    }
    // Clear errors
    setErrors({});
  }, [role, open]);

  // Handle permission selection
  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      description?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Role name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (role) {
        // Update existing role
        await updateRole(role.id, {
          name,
          description,
          permissionIds: selectedPermissions,
          isActive,
        });
      } else {
        // Create new role
        await createRole({
          name,
          description,
          permissionIds: selectedPermissions,
        });
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Group permissions by resource
  const groupedPermissions: Record<string, Permission[]> = {};
  availablePermissions.forEach((permission) => {
    const [resource] = permission.name.split(":");
    if (!groupedPermissions[resource]) {
      groupedPermissions[resource] = [];
    }
    groupedPermissions[resource].push(permission);
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {role ? `Edit Role: ${role.name}` : "Create New Role"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                margin="normal"
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Active"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Permissions
              </Typography>
              <Divider />
            </Grid>

            {/* Display permissions grouped by resource */}
            {Object.entries(groupedPermissions).map(
              ([resource, permissions]) => (
                <Grid item xs={12} md={6} key={resource}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    {resource}
                  </Typography>
                  <FormGroup>
                    {permissions.map((permission) => (
                      <FormControlLabel
                        key={permission.id}
                        control={
                          <Checkbox
                            checked={selectedPermissions.includes(
                              permission.id
                            )}
                            onChange={() =>
                              handlePermissionChange(permission.id)
                            }
                          />
                        }
                        label={permission.name}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          color="primary"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
