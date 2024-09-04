import React from "react";
import { Container, useMediaQuery, useTheme, Box } from "@mui/material";
import RoleList from "../components/RoleList"; // Import the RoleList component

function Home() {

  return (
    <Container
      style={{
        // marginLeft: isSmUp ? 240 : 0,
        marginTop: 64,
        padding: "20px",
      }}
    >
      <RoleList />
    </Container>
  );
}

export default Home;
