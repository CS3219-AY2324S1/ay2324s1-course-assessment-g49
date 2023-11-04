import { useRef, useMemo, useEffect } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { Card, CardContent, CardMedia } from "@mui/material";
import MeetingControls from "./MeetingControls";

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

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
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      <Card>
        {webcamOn ? (
          <CardMedia>
            <ReactPlayer
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              height={"100%"}
              width={"100%"}
              style={{ display: "flex" }}
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </CardMedia>
        ) : (
          <div
            style={{
              backgroundColor: "black",
              flex: 1,
            }}
          >
            video is off
          </div>
        )}
        <CardContent>
          {displayName}
          {isLocal && <MeetingControls />}
        </CardContent>
      </Card>
    </div>
  );
}

export default ParticipantView;
