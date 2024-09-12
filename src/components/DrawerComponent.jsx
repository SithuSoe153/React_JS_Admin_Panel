import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VerifiedIcon from "@mui/icons-material/Verified";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useCookies } from "react-cookie";

const DrawerComponent = ({ open, onClose, variant }) => {
  const [, , removeCookie] = useCookies(["access_token", "refresh_token"]);

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout(removeCookie);
    navigate("/login");
  };

  const [openCollapse, setOpenCollapse] = useState(true);

  const handleCollapseClick = () => {
    setOpenCollapse(!openCollapse);
  };

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: 64, // Ensures it's below the app bar
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <div>
        {/* <Divider /> */}
        <List>
          <ListItem onClick={handleCollapseClick}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Create Role" />
            {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component="a" href="/way_pickup_list/All">
                <ListItemText primary="Data Set" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        {/* <Divider /> */}
        <List>
          <ListItem component="a" href="/toc.html" target="_blank">
            <div style={{ flexGrow: 1 }}>
              <Button
                startIcon={<VerifiedIcon />}
                sx={{
                  // textTransform: "none",
                  justifyContent: "flex-start",
                  width: "100%",
                  color: "black",
                  "& .MuiSvgIcon-root": {
                    color: "black",
                  },
                }}
              >
                Dashboard
              </Button>
            </div>
          </ListItem>
        </List>
        {/* <Divider /> */}
        <List>
          <ListItem>
            <div style={{ flexGrow: 1 }}>
              <Button
                onClick={handleLogout}
                startIcon={<PowerSettingsNewIcon />}
                sx={{
                  // textTransform: "none",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                Logout
              </Button>
            </div>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
