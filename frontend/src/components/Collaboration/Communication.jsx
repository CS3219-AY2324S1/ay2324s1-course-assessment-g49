import { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "./MeetingView";
import axios from "axios";
import AuthenticationToken from "../../services/AuthenticationToken";

function Communication({ meetingRoomId }) {
  const videoAuthToken = import.meta.env.VITE_VIDEO_TOKEN;
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [meetingId, setMeetingId] = useState(null);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const userId = userdata.userId;
  const [username, setUsername] = useState("");

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`${databaseURL}/users/${userId}`, {
        headers: AuthenticationToken(),
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUsername();
    setMeetingId(meetingRoomId);
  }, []);

  // Sets meetingId to null when user leaves/ends
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: username,
      }}
      token={videoAuthToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : null;
}

export default Communication;
