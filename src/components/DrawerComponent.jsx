import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const DrawerComponent = ({ open, onClose, variant }) => {
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
          top: { sm: 64, xs: 0 },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <div>
        <Divider />
        <List>
          <ListItem onClick={handleCollapseClick}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>

            <ListItemText primary="Way management" />
            {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component="a" href="/way_pickup_list/All">
                <ListItemText primary="Pickup ways" />
              </ListItem>
              <ListItem component="a" href="/way_delivery_list/All">
                <ListItemText primary="Deliver ways" />
              </ListItem>
              <ListItem component="a" href="/way_delivery_failed_list">
                <ListItemText primary="Failed ways" />
              </ListItem>
              <ListItem component="a" href="/way_delivery_return_list">
                <ListItemText primary="Return ways" />
              </ListItem>
              <ListItem component="a" href="/way_delivery_route_list">
                <ListItemText primary="Parcel In/Out" />
              </ListItem>
              <ListItem component="a" href="/way_transit_list/All">
                <ListItemText primary="Transit route" />
              </ListItem>
              <ListItem component="a" href="/way_tracking">
                <ListItemText primary="Tracking map" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem component="a" href="/toc.html" target="_blank">
            <ListItemIcon>
              <VerifiedIcon />
            </ListItemIcon>
            <ListItemText primary="Terms & Conditions" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
