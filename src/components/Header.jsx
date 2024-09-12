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
  Tooltip,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Cookies, useCookies } from "react-cookie";

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [cookies] = useCookies(["user_info"]);

  // let username = cookies.user_info.name;

  return (
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
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <a href="/">
          <img
            alt="MyDay Admin Panel"
            src="/vite.svg"
            sx={{
              width: "40px",
              display: { xs: "none", sm: "block" },
            }}
          />
        </a>
        <Typography
          variant="h5"
          color="inherit"
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            marginLeft: "16px",
          }}
        >
          MyDay Admin Panel
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          color="inherit"
          aria-haspopup="true"
          startIcon={
            <img
              alt="Language"
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
              style={{ width: "24px",
              }}
            />
          }
          endIcon={<ArrowDropDownIcon />}
          sx={{
            textTransform: "none",
            marginRight: "16px",
          }}
        >
          <Typography
            variant="h7"
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            English
          </Typography>
        </Button>

        {/* <Tooltip title={username}> */}
        <Tooltip >
          <Avatar
            src="/user.jpg"
            sx={{
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
