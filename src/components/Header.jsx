import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import DrawerComponent from "./DrawerComponent";

const Header = ({ onMenuClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();

  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    console.log("Menu button clicked");

    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "fixed",
          backgroundColor: "#b5b5b5",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <a href="/">
            <img
              alt="MyDay Admin Panel"
              src="/vite.svg"
              style={{ width: "40px" }}
            />
          </a>
          <Typography
            variant="h4"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "16px" }}
          >
            MyDay Admin Panel
          </Typography>
          <Button
            color="inherit"
            aria-haspopup="true"
            startIcon={
              <img
                alt="Language"
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
                style={{ width: "24px", marginRight: "4px" }}
              />
            }
            endIcon={<ArrowDropDownIcon />}
            style={{ textTransform: "none" }}
          >
            English
          </Button>
          <Avatar
            src="/vite.svg"
            style={{ cursor: "pointer", marginLeft: "16px" }}
          />
        </Toolbar>
      </AppBar>

      <DrawerComponent
        open={drawerOpen}
        onClose={handleDrawerToggle}
        variant={isSmUp ? "permanent" : "temporary"}
      />
    </>
  );
};

export default Header;
