import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import MeetingControls from "./MeetingControls";
import { Button, Grid } from "@mui/material";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join, participants } = useMeeting({
    // callback for when user joins meeting
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    // callback for when user has ended meeting
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };
  return (
    <Grid container>
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <Grid container item direction="column">
          <MeetingControls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </Grid>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <Button onClick={joinMeeting}>Join</Button>
      )}
    </Grid>
  );
}

export default MeetingView;
