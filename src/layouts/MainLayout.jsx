import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const MainLayout = () => {
  const theme = useTheme();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
