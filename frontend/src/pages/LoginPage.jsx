import * as React from "react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Copyright from "../components/Copyright";
import axios from "axios";
import { SnackbarContext } from "../utils/SnackbarContextUtil";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../utils/AuthContextUtil";

export default function LoginPage() {
  const { setUser } = useAuth();
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const inputRefUsername = useRef(null);
  const inputRefPassword = useRef(null);
  const navigate = useNavigate();
  const { snack, setSnack } = useContext(SnackbarContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = inputRefUsername.current.value;
      const password = inputRefPassword.current.value;

      const isInputFieldEmpty = !username || !password;

      if (isInputFieldEmpty) {
        setSnack({
          message: "Missing fields detected!",
          open: true,
          severity: "warning",
        });
      } else {
        const user = {
          username,
          password,
        };
        await axios.post(`${databaseURL}/auth/login`, user).then((res) => {
          const token = res.data.jwt;
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
          const userRole = decodedToken.role;
          const tokenExpiry = decodedToken.exp;
          const userData = {
            jwt: token,
            userId: userId,
            userRole: userRole,
            tokenExp: tokenExpiry,
          };
          if (res.data.jwt) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          }
        });
        navigate("/home");
        setSnack({
          message: "Logged in successfully",
          open: true,
          severity: "success",
        });
      }
    } catch (err) {
      if (err.response?.response.data) {
        setSnack({
          message: err.response.data,
          open: true,
          severity: "warning",
        });
      } else {
        console.error("Error updating user's data", err);
      }
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      className="loginPage"
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h2">
            Peerprep
          </Typography>
          <Typography component="h1" variant="h5" marginTop={"2em"}>
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={inputRefUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={inputRefPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              data-testid="sign-in-button"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
