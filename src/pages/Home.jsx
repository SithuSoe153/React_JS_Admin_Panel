import React, { useState } from "react";
import {
  Container,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import Header from "../components/Header";
import RoleList from "../components/RoleList"; // Import the RoleList component

function Home() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div style={{ display: "flex" }}>
      <Container
        style={{
          marginLeft: isSmUp ? 240 : 0,
          marginTop: 64,
          padding: "20px",
        }}
      >
        {/* Data */}

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.paper", p: 3 }}
        >
          {/* Tab Content */}
          <Box sx={{ p: 2 }}>
            <RoleList />
          </Box>
        </Box>

        {/* Data */}
      </Container>
    </div>
  );
}

export default Home;
