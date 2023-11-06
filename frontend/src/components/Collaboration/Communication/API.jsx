// TODO: to remove after setting up backend for communication
export const authToken = "authtoken";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

// API call to create meeting
export const createMeeting = async ({ token }) => {
  // TODO: uncomment after setting up backend for communication
  // try {
  //   const response = await axios.post(`${databaseURL}/create-meeting`);
  //   const { roomId } = response.data;
  //   return roomId;
  // } catch (error) {
  //   console.error("There was an error creating the meeting");
  // }

  // TODO: to remove after setting up backend for communication
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  // Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
