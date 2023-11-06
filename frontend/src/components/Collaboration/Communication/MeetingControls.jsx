import { useMeeting } from "@videosdk.live/react-sdk";
import { IconButton, Grid } from "@mui/material";
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

  const responsiveIconSize = "calc(8px + 1vw)";

  return (
    <Grid container direction="row">
      <Grid item>
        <IconButton onClick={handleMicToggle}>
          {localMicOn ? (
            <MicIcon style={{ fontSize: responsiveIconSize }} />
          ) : (
            <MicOffIcon style={{ fontSize: responsiveIconSize }} />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleWebcamToggle}>
          {localWebcamOn ? (
            <VideocamIcon style={{ fontSize: responsiveIconSize }} />
          ) : (
            <VideocamOffIcon style={{ fontSize: responsiveIconSize }} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MeetingControls;
