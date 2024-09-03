import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
  Divider,
  CardActions,
  Button,
  IconButton,
  Typography,
  SvgIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";

const CreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [userGroup, setUserGroup] = useState("Management and Operation Group");
  const [permissions, setPermissions] = useState({
    accountingBalanceDownload: false,
    accountingCreate: false,
    userVisibleMerchants: false,
    zoneUpdate: false,
  });

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    // Handle the save logic here
    console.log("Role Name:", roleName);
    console.log("User Group:", userGroup);
    console.log("Permissions:", permissions);
  };

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        }
        title="Create a new Role"
        subheader="Role means that the group of privileges/permissions which will be applied to the users!"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              title="top management level"
              control={
                <Checkbox
                  checked={permissions.accountingBalanceDownload}
                  onChange={handlePermissionChange}
                  name="accountingBalanceDownload"
                  color="primary"
                />
              }
              label="Accounting account balance download"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.accountingCreate}
                  onChange={handlePermissionChange}
                  name="accountingCreate"
                  color="primary"
                />
              }
              label="Accounting account create"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              title="user level"
              control={
                <Checkbox
                  checked={permissions.userVisibleMerchants}
                  onChange={handlePermissionChange}
                  name="userVisibleMerchants"
                  color="primary"
                />
              }
              label="User visible all merchants"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              title="top management level"
              control={
                <Checkbox
                  checked={permissions.zoneUpdate}
                  onChange={handlePermissionChange}
                  name="zoneUpdate"
                  color="primary"
                />
              }
              label="Zone update"
            />
          </Grid>
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
          <Grid item xs={12} md={12}>
            <Autocomplete
              id="roleGroup"
              options={["Management and Operation Group", "Another Group"]}
              value={userGroup}
              onChange={(event, newValue) => setUserGroup(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User Group"
                  required
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
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
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateRole;
