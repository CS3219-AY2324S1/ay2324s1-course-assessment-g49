import * as React from "react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CountrySelect from "../components/CountrySelect";
import Copyright from "../components/Copyright";
import axios from "axios";
import { SnackbarContext } from "../utils/SnackbarContextUtil";

export default function RegisterPage() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const inputRefUsername = useRef(null);
  const inputRefCountry = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);
  const navigate = useNavigate();
  const { snack, setSnack } = useContext(SnackbarContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = inputRefUsername.current.value.trimEnd();
      const country = inputRefCountry.current.value.trimEnd();
      const email = inputRefEmail.current.value.trimEnd();
      const password = inputRefPassword.current.value;

      const containsWhitespace =
        username.indexOf(" ") >= 0 || email.indexOf(" ") >= 0;
      const isInputFieldEmpty = !username || !country || !email || !password;

      if (containsWhitespace) {
        setSnack({
          message: "No whitespace allowed in username or email!",
          open: true,
          severity: "warning",
        });
      } else if (isInputFieldEmpty) {
        setSnack({
          message: "Missing fields detected!",
          open: true,
          severity: "warning",
        });
      } else {
        const newUser = {
          username,
          email,
          country,
          password,
        };

        await axios.post(`${databaseURL}/auth/register`, newUser);
        navigate("/");
        setSnack({
          message: "Registered successfully",
          open: true,
          severity: "success",
        });
      }
    } catch (err) {
      setSnack({
        message: err.response.data,
        open: true,
        severity: "warning",
      });
      console.error("Error updating user's data", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h2">
          Peerprep
        </Typography>
        <Typography component="h1" variant="h5" marginTop={"2em"}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={inputRefUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <CountrySelect inputRefCountry={inputRefCountry}></CountrySelect>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={inputRefEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputRef={inputRefPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
