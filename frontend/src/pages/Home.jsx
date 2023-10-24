import React from "react";
import { Grid } from "@mui/material";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item>
        <h1>Home Page</h1>
      </Grid>
    </Grid>
  );
};

export default Home;
