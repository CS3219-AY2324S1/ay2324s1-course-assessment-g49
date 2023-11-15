import { useRef, useMemo, useEffect } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import MeetingControls from "./MeetingControls";

function ParticipantView(props) {
  const micRef = useRef(null);
  const {
    webcamStream,
    micStream,
    webcamOn,
    disableWebcam,
    disableMic,
    micOn,
    isLocal,
    displayName,
  } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div style={{ height: "100%" }}>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      <Card style={{ height: "100%", boxSizing: "border-box" }}>
        {webcamOn ? (
          <div
            style={{ height: "70%", width: "100%", backgroundColor: "black" }}
          >
            <ReactPlayer
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              width="100%"
              height="100%"
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </div>
        ) : (
          <div style={{ backgroundColor: "black", height: "70%" }} />
        )}
        <CardContent
          style={{
            display: "flex",
            alignItems: "center",
            height: "30%",
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ fontSize: "calc(2px + 1vw)" }}>
                {displayName}
                {isLocal && " (You)"}
              </Typography>
            </Grid>
            <Grid item>{isLocal && <MeetingControls />}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParticipantView;
