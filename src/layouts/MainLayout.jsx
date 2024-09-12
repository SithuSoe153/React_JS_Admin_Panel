import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import DrawerComponent from "../components/DrawerComponent";
import { useMediaQuery, useTheme } from "@mui/material";

const MainLayout = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [drawerOpen, setDrawerOpen] = useState(isSmUp);

  const appBarHeight = 64;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ display: "flex" }}>
      <Header onMenuClick={handleDrawerToggle} />
      <DrawerComponent
        open={drawerOpen}
        onClose={handleDrawerToggle}
        variant={isSmUp ? "persistent" : "temporary"}
      />
      <div
        style={{
          flexGrow: 1,
          marginLeft: isSmUp && drawerOpen ? "240px" : "0px",
          transition: "margin-left 0.3s",
          padding: "16px",
          marginTop: `${appBarHeight}px`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
