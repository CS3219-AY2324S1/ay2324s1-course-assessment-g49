import React from "react";
import { Grid } from "@mui/material";
import NavBar from "../components/NavBar";
import MatchPage from "./MatchingPage/MatchPage";

const Home = () => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item>
        <h1>Welcome to PeerPrep!</h1>
      </Grid>
      <MatchPage/>
    </Grid>
  );
};

export default Home;
