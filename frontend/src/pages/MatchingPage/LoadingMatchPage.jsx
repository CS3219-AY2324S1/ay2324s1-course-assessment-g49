import { useState, useEffect, useContext } from "react";
import { Client } from "@stomp/stompjs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import TimerComponent from "../../components/TimerComponent";
import NavBar from "../../components/NavBar";
import AuthenticationToken from "../../services/AuthenticationToken";
import { SnackbarContext } from "../../utils/SnackbarContextUtil";

function LoadingMatchPage() {
  const hostname = import.meta.env.VITE_API_GATEWAY_HOSTNAME;
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

    setTimerCompleted(true);
  };

  const handleCollaboration = (message) => {
    navigate("/collaboration", {
      state: {
        roomId: message.roomId,
        questionId: message.questionId,
        sessionId: message.sessionId,
      },
    });
  };

  const handleNoQuestion = () => {
    setSnack({
      message: "No such question, try another question!",
      open: true,
      severity: "warning",
    });
  };

  const handleCancel = () => {
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
      brokerURL: `wss://${hostname}/match`,
      connectHeaders: AuthenticationToken(),
      onConnect: () => {
        setMatchClient(client);
        client.subscribe("/user/queue/match", (message) => {
          console.log(`Received: ${message.body}`);
          const messageObject = JSON.parse(message.body);
          if (messageObject.questionId == -1) {
            handleNoQuestion();
            handleResponseReceived();
            setText("No such question found!");
          } else {
            handleResponseReceived();
            setText("Found a match");
            handleCollaboration(messageObject);
            setSnack({
              message: "Matched successfully!",
              open: true,
              severity: "success",
            });
          }
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
