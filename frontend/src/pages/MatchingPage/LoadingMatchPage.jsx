import { useState, useEffect, useContext } from "react";
import { Client } from "@stomp/stompjs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import TimerComponent from "../../components/TimerComponent";
import NavBar from "../../components/NavBar";
import AuthenticationToken from "../../services/AuthenticationToken";
import { SnackbarContext } from "../../utils/SnackbarContextUtil";

function LoadingMatchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { snack, setSnack } = useContext(SnackbarContext);

  const [matchClient, setMatchClient] = useState(null);

  const [text, setText] = useState("Matching in progress...");
  const [timerCompleted, setTimerCompleted] = useState(false);

  const [responseReceived, setResponseReceived] = useState(false);

  const { complexity, category } = location.state;

  const handleResponseReceived = () => {
    setResponseReceived(true);
    setText("Found a match");
    setTimerCompleted(true);
  };

  const handleCollaboration = (message) => {
    navigate("/collaboration", {
      state: {
        // meetingId: message.meetingId,
        // questionId: message.questionId,
        // sessionId: message.sessionId,
      },
    });
  };

  const handleCancel = () => {
    console.log("cancel request");
    matchClient.publish({
      destination: "/app/cancel",
      body: JSON.stringify({
        isCreate: false,
        complexity: complexity,
        category: category,
        userId: JSON.parse(localStorage.getItem("user")).userId,
      }),
    });
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/match",
      connectHeaders: AuthenticationToken(),
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        setMatchClient(client);
        client.subscribe("/user/queue/match", (message) => {
          console.log(`Received: ${message.body}`);
          client.deactivate();
          setMatchClient(null);
          handleResponseReceived(message.body);
          handleCollaboration();
          setSnack({
            message: "Matched successfully!",
            open: true,
            severity: "success",
          });
        });
        client.publish({
          destination: "/app/match",
          body: JSON.stringify({
            isCreate: true,
            complexity: complexity,
            category: category,
            userId: JSON.parse(localStorage.getItem("user")).userId,
          }),
        });
      },
    });
    client.activate();
    return () => {
      client.deactivate();
    };
  }, []);

  const handleDisconnectClick = () => {
    if (matchClient) {
      matchClient.deactivate();
      setMatchClient(null);
    }
    console.log("Disconnected");
    navigate("/home");
  };

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
              id="practice-alone"
              variant="contained"
              disabled={!timerCompleted}
              onClick={handleDisconnectClick}
              color="secondary"
            >
              Exit Matching
            </Button>
          </Grid>
        </Grid>
        <Grid item mt={5}>
          {!responseReceived && (
            <TimerComponent
              text={text}
              setText={setText}
              timerCompleted={timerCompleted}
              setTimerCompleted={setTimerCompleted}
              onCancel={handleCancel}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default LoadingMatchPage;
