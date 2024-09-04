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
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RoleList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [roles, setRoles] = useState([
    { name: "Administrator", active: true },
    { name: "Manager", active: true },
    { name: "Customer Service", active: false },
    { name: "Finance", active: true },
    { name: "Custom role", active: false },
  ]);

  const navigate = useNavigate();

  const handleToggle = (index) => {
    const newRoles = roles.map((role, i) =>
      i === index ? { ...role, active: !role.active } : role
    );
    setRoles(newRoles);
  };

  const handleViewPermissions = (role) => {
    navigate(`/role-create/${role}`);
  };

  const handleCreateRole = (index) => {
    navigate('/role-create');
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

        <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <Switch
                      checked={role.active}
                      onChange={() => handleToggle(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      title="View permission list"
                      onClick={() =>
                        handleViewPermissions("sasjdfm-asdfsdesdf-q2dads")
                      }
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
    </>
  );
};

export default RoleList;
