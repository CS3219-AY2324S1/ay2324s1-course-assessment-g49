import * as React from "react";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import CustomSnackbar from "../components/CustomSnackbar";
import axios from "axios";
import userContextProvider from "../utils/Context";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const inputRefUsername = useRef(null);
  const inputRefPassword = useRef(null);
  const navigate = useNavigate();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");
  const { userContext, setUserContext } = useContext(userContextProvider);

  const handleEmptyInputField = () => {
    setsnackbarMessage("Missing fields detected!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  /*
	Renders snackbar with error message
	*/
  const handleError = (message) => {
    setsnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = inputRefUsername.current.value;
      const password = inputRefPassword.current.value;

      const isInputFieldEmpty = !username || !password;

      if (isInputFieldEmpty) {
        handleEmptyInputField();
      } else {
        const user = {
          username,
          password,
        };
        await axios
          .post("http://localhost:8080/auth/login", user)
          .then((res) => {
            setUserContext({
              username: res.data.username,
              userId: res.data.id,
            });
            localStorage.setItem('user', JSON.stringify(res.data));
          });
        navigate("/home");
        alert("User Logged In Successfully");
      }
    } catch (err) {
      handleError(err.response.data);
      console.error("Error updating user's data", err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
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
              <CustomSnackbar
                open={isSnackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                severity="warning"
              ></CustomSnackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
