import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
  CardActions,
  Button,
  IconButton,
  Container,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { RoleService, PrivilegeService } from "../services/data-services";
import { useParams } from "react-router-dom";

const CreateRole = () => {
  const { guid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [privileges, setPrivileges] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [createPrivilegeOpen, setCreatePrivilegeOpen] = useState(false); // Toggle for creating a new privilege
  const [newPrivilege, setNewPrivilege] = useState({
    name: "",
    description: "",
    displayName: "",
  });

  useEffect(() => {
    const fetchPrivileges = async () => {
      try {
        const fetchedPrivileges = await RoleService.getPrivileges();
        setPrivileges(fetchedPrivileges);

        if (guid) {
          const response = await RoleService.getRole(guid);
          if (response.success && Array.isArray(response.data.items)) {
            const rolePrivileges = response.data.items;
            if (rolePrivileges.length > 0) {
              setRoleName(rolePrivileges[0].roleName);
            }
            const selectedPermissions = {};
            rolePrivileges.forEach((priv) => {
              selectedPermissions[priv.privilegeGuid] = true;
            });
            setSelectedPermissions(selectedPermissions);
          }
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPrivileges();
  }, [guid]);

  const handlePermissionChange = (event) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = async () => {
    const roleData = {
      name: roleName,
      privilegeGuid: Object.keys(selectedPermissions).filter(
        (key) => selectedPermissions[key]
      ),
    };

    try {
      if (guid) {
        await RoleService.updateRole(guid, roleData);
        alert("Role updated successfully!");
      } else {
        await RoleService.createRole(roleData);
        alert("Role created successfully!");
      }
    } catch (error) {
      alert("Failed to save role: " + error.message);
    }
  };

  const handleCreatePrivilege = async () => {
    try {
      await PrivilegeService.createPrivilege(newPrivilege);
      alert("Privilege created successfully!");
      // Re-fetch privileges after creating a new one
      const fetchedPrivileges = await RoleService.getPrivileges();
      setPrivileges(fetchedPrivileges);
      // Clear the new privilege form
      setNewPrivilege({ name: "", description: "", displayName: "" });
    } catch (error) {
      alert("Failed to create privilege: " + error.message);
    }
  };

  return (
    <>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <IconButton aria-label="close">
              <CloseIcon />
            </IconButton>
          }
          title={guid ? "Update Role" : "Create a new Role"}
          subheader="A role is a set of privileges assigned to users."
        />
        <CardContent>
          <Grid container spacing={1}>
            {privileges.map((privilege) => (
              <Grid item xs={6} md={4} key={privilege.privilegeGuid}>
                <Tooltip title={privilege.privilegeDescription}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!selectedPermissions[privilege.privilegeGuid]}
                        onChange={handlePermissionChange}
                        name={privilege.privilegeGuid}
                        color="primary"
                      />
                    }
                    label={privilege.privilegeDisplayName}
                  />
                </Tooltip>
              </Grid>
            ))}

            <Grid item xs={12} md={12}>
              <TextField
                id="roleName"
                label="Role name"
                required
                fullWidth
                margin="dense"
                variant="outlined"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* Section to create a new privilege */}
        <CardContent>
          <Button
            onClick={() => setCreatePrivilegeOpen(!createPrivilegeOpen)}
            endIcon={<ExpandMoreIcon />}
            aria-expanded={createPrivilegeOpen}
          >
            {createPrivilegeOpen
              ? "Close New Privilege"
              : "Create New Privilege"}
          </Button>
          <Collapse in={createPrivilegeOpen} timeout="auto" unmountOnExit>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Privilege Name"
                  fullWidth
                  value={newPrivilege.name}
                  onChange={(e) =>
                    setNewPrivilege({ ...newPrivilege, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Display Name"
                  fullWidth
                  value={newPrivilege.displayName}
                  onChange={(e) =>
                    setNewPrivilege({
                      ...newPrivilege,
                      displayName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  value={newPrivilege.description}
                  onChange={(e) =>
                    setNewPrivilege({
                      ...newPrivilege,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleCreatePrivilege}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Save New Privilege
            </Button>
          </Collapse>
        </CardContent>

        <Divider />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "capitalize" }}
            onClick={handleSave}
            endIcon={<CheckIcon />}
          >
            {guid ? "Update Role" : "Save"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CreateRole;
