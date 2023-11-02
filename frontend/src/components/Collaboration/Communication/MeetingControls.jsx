import { useMeeting } from "@videosdk.live/react-sdk";
import { Button, Grid } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

function MeetingControls() {
  const { toggleMic, toggleWebcam, localMicOn, localWebcamOn } = useMeeting();

  const handleMicToggle = () => {
    toggleMic();
  };

  const handleWebcamToggle = () => {
    toggleWebcam();
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={1} p={1}>
      <Grid item>
        <Button
          onClick={handleMicToggle}
          startIcon={localMicOn ? <MicIcon /> : <MicOffIcon />}
          variant="outlined"
          size="small"
        >
          {localMicOn ? "Mute" : "Unmute"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={handleWebcamToggle}
          startIcon={localWebcamOn ? <VideocamIcon /> : <VideocamOffIcon />}
          variant="outlined"
          size="small"
        >
          {localWebcamOn ? "Off video" : "On video"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default MeetingControls;
