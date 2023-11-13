import React from "react";
import { Grid, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import { Client } from "@stomp/stompjs";
import AuthenticationToken from "../services/AuthenticationToken";

const sampleMatchRequest = {
  userId: JSON.parse(localStorage.getItem("user")).userId,
  complexity: "EASY",
  category: "ARRAYS"
}

const handleOnClick = () => {
  const client = new Client({
    brokerURL: "ws://localhost:8080/match",
    connectHeaders: AuthenticationToken(),
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      client.subscribe('/user/queue/match', message => {
        console.log(`Received: ${message.body}`)
      }
      );
      client.publish({ destination: '/app/match', body: JSON.stringify(sampleMatchRequest) });
    },
  });
  client.activate()
}

const Home = () => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item>
        <h1>Home Page</h1>
        <Button variant="contained" onClick={handleOnClick}>Find a match</Button>
      </Grid>
    </Grid>
  );
};

export default Home;
