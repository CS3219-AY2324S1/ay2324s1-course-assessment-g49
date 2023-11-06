import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import ChatView from "./ChatView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [chatExpanded, setChatExpanded] = useState(false);
  const { join, participants } = useMeeting({
    // callback for when user joins meeting
    onMeetingJoined: () => {
      setJoined("joined");
    },
    // callback for when user has ended meeting
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    join();
  };

  const handleChatToggle = () => {
    setChatExpanded((prev) => !prev); // Toggle chat accordion
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Grid container direction="column" style={{ height: "100%" }} spacing={2}>
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "joined" ? (
          [...participants.keys()].map((participantId, index) => (
            <Grid
              key={participantId}
              item
              xs={true}
              style={{ height: "0", flexGrow: 1 }}
            >
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            </Grid>
          ))
        ) : (
          <Button onClick={joinMeeting}>Join</Button>
        )}
        <Grid item>
          <Accordion
            square
            expanded={chatExpanded}
            onChange={handleChatToggle}
            style={{
              zIndex: 1000,
              maxHeight: "100%",
              transition: "max-height 0.3s ease-in-out",
              overflow: "auto",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Chat</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ChatView />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingView;
