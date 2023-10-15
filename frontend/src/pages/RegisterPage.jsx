import * as React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountrySelect from "../components/CountrySelect";
import Copyright from "../components/Copyright";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterPage() {
  const inputRefUsername = useRef(null);
  const inputRefCountry = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = inputRefUsername.current.value;
      console.log(username);
      const country = inputRefCountry.current.value;
      console.log(country);
      const email = inputRefEmail.current.value;
      const password = inputRefPassword.current.value;
      const newUser = {
        username,
        email,
        country,
        password,
      };
      console.log(newUser);
      await axios.post("http://localhost:8080/users", newUser);
      navigate("/");
      alert("User Registration Successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                <CountrySelect
                  inputRefCountry={inputRefCountry}
                ></CountrySelect>
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
    </ThemeProvider>
  );
}
