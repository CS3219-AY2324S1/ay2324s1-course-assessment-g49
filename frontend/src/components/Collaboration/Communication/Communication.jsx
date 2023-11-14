import { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import MeetingView from "./MeetingView";

import axios from "axios";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

function Communication() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [meetingId, setMeetingId] = useState(null);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const userId = userdata.userId;
  const [username, setUsername] = useState("");

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`${databaseURL}/users/${userId}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  // Get meetingId from API.jsx
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  // Sets meetingId to null when user leaves/ends
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: username,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    // TODO: to remove after setting up backend for communication
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Communication;
