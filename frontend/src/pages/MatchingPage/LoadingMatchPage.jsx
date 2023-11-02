import { useState, useEffect, useMemo, StrictMode } from "react";
import { Client } from "@stomp/stompjs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import TimerComponent from "../../components/TimerComponent";
import NavBar from "../../components/NavBar";

function LoadingMatchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [connected, setConnected] = useState(false);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const [text, setText] = useState("Matching in progress...");
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

  const { complexity } = location.state;

  const handleResponseReceived = () => {
    setResponseReceived(true);
    setText("Found a match");
    setTimerCompleted(true);
  };
  const handleTimerComplete = () => {
    setText("Could not find a match");
    setTimerCompleted(true);
  };

  const handlePracticeAlone = () => {
    navigate("/practicealone");
  };

  const handleCollaboration = () => {
    navigate("/collaboration");
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/matching",
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      setConnected(true);
      setStompClient(client);
      console.log("Connected: " + frame);
      client.subscribe("/topic/matching", (reply) => {
        showReply(JSON.parse(reply.body).reply);
        client.deactivate();
        setConnected(false);
        handleResponseReceived();
      });
    };

    client.onWebSocketError = (error) => {
      console.error("Error with WebSocket:", error);
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers.message);
      console.error("Additional details:", frame.body);
    };

    client.activate();
    return () => {
      setConnected(false);
      client.deactivate();
    };
  }, []);

  const handleDisconnectClick = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
    navigate("/matchpage");
  };

  const sendMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/match",
        body: JSON.stringify({ message }),
      });
    }
  };

  const showReply = (message) => {
    setReplies((prevReplies) => [...prevReplies, message]);
  };

  useEffect(() => {
    if (complexity) {
      setMessage(complexity);
      sendMessage();
    }
  }, [complexity, stompClient]);

  return (
    <>
      <NavBar />
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h4">{text}</Typography>
        </Grid>
        <Grid container item mt={2} spacing={3} justifyContent="center">
          <Grid item>
            <Button
              id="disconnect"
              variant="contained"
              onClick={handleDisconnectClick}
              color="error"
            >
              Exit matching
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="practice-alone"
              variant="contained"
              disabled={!timerCompleted}
              onClick={handlePracticeAlone}
              color="secondary"
            >
              Practice alone
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="practice-alone"
              variant="contained"
              disabled={!timerCompleted || !responseReceived}
              onClick={handleCollaboration}
            >
              Practice together
            </Button>
          </Grid>
        </Grid>
        <Grid item mt={5}>
          {!responseReceived && (
            <TimerComponent onTimerComplete={handleTimerComplete} />
          )}
        </Grid>
        <div id="replies">
          {replies.map((reply, index) => (
            <div key={index}>{reply}</div>
          ))}
        </div>
      </Grid>
    </>
  );
}

export default LoadingMatchPage;
