import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Box sx={{ height: "100vh", paddingTop: "3%" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Card>
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <img
                    alt="Delivery management platform"
                    src="./vite.svg"
                    style={{ width: "150px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    MyDay Admin Management
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Username"
                    variant="outlined"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                    }}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                    }}
                  >
                    Get password?
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
