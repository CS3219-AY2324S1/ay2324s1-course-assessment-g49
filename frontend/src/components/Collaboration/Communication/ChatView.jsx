import { useState } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { InputBase, Paper, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatView() {
  // destructure publish method from usePubSub hook
  const { publish, messages } = usePubSub("CHAT");

  // State to store the user typed message
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publish(message, { persist: true });
    // Clearing the message input
    setMessage("");
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0.5}
        marginBottom={1}
      >
        {messages.map((message) => {
          return (
            <Grid item>
              {message.senderName}: {message.message}
            </Grid>
          );
        })}
      </Grid>
      <Paper elevation={2} component="form" sx={{ alignItems: "center" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ "aria-label": "Chat here", value: message }}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Chat here"
        ></InputBase>
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default ChatView;
