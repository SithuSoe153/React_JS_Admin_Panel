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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const navigate = useNavigate();

  const handleLogin = () => {
    AuthService.login(username, password)
      .then(({ accessToken, refreshToken }) => {
        setCookie("access_token", accessToken, { path: "/" });
        setCookie("refresh_token", refreshToken, { path: "/" });

        return AuthService.getUserInfo(accessToken);
      })
      .then((userInfoResponse) => {
        if (userInfoResponse.success) {
          const userInfo = userInfoResponse.data;
          setCookie("user_info", JSON.stringify(userInfo), { path: "/" });
          navigate("/dashboard");
        } else {
          console.error("Failed to fetch user info");
        }
      })
      .catch((err) => {
        console.error("Login failed or fetching user info failed:", err);
      });
  };

  return (
    <Box sx={{ height: "100vh", paddingTop: "3%" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
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
