import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RoleService } from "../services/data-services"; // Import the API call

const RoleList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [roles, setRoles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Store selected role for confirmation
  const [newActiveStatus, setNewActiveStatus] = useState(null); // Store the new active status
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch roles data on component mount
    RoleService.getRoles()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Failed to fetch roles:", error);
      });
  }, []);

  // Handle switch toggle to show confirmation dialog
  const handleToggle = (guid, index) => {
    const role = roles[index];
    const updatedStatus = !role.roleActive; // Toggle current active status
    setSelectedRole({ guid, index });
    setNewActiveStatus(updatedStatus);
    setDialogOpen(true); // Open the confirmation dialog
  };

  // Confirm status change
  const handleConfirmToggle = async () => {
    const { guid, index } = selectedRole;

    try {
      // Update the active status in the backend via the RoleService
      await RoleService.updateActiveStatus(guid, newActiveStatus);

      // Update the local state after successful backend update
      const updatedRoles = roles.map((role, i) =>
        i === index ? { ...role, roleActive: newActiveStatus } : role
      );
      setRoles(updatedRoles);
    } catch (error) {
      console.error("Failed to update active status:", error);
    }

    setDialogOpen(false); // Close the dialog after confirmation
  };

  const handleViewPermissions = (role) => {
    navigate(`/role-create/${role}`);
  };

  const handleCreateRole = () => {
    navigate("/role-create");
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close dialog without confirming
  };

  return (
    <>
      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(newValue)}
        aria-label="role tabs"
      >
        <Tab label="Main" />
        <Tab label="DataSet 1" />
        <Tab label="DataSet 2" />
        <Tab label="DataSet 3" />
        <Tab label="DataSet 4" />
        <Tab label="DataSet 5" />
        <Tab label="Permissions" />
      </Tabs>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="h5">Role List</Typography>
        <Typography variant="body2" color="text.secondary">
          The list of roles and their permissions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateRole}
          sx={{ mt: 2 }}
        >
          Create New Role
        </Button>

        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Permissions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, index) => (
                <TableRow key={index}>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>
                    <Switch
                      checked={role.roleActive}
                      onChange={() => handleToggle(role.roleGuid, index)}
                      disabled={!role.roleEditable} // Disable switch if not editable
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      title="View permission list"
                      onClick={() => handleViewPermissions(role.roleGuid)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {newActiveStatus ? "activate" : "deactivate"} this role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmToggle} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoleList;
