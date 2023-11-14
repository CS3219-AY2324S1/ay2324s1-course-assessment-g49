import { useState, useEffect, useRef } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { InputBase, Paper, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatView({ chatExpanded }) {
  // destructure publish method from usePubSub hook
  const { publish, messages } = usePubSub("CHAT");

  // State to store the user typed message
  const [message, setMessage] = useState("");
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current && chatExpanded) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatExpanded, messages]);

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publish(message, { persist: true });
    // Clearing the message input
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
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
              <strong>{message.senderName}</strong>: {message.message}
            </Grid>
          );
        })}
        <div ref={endOfMessagesRef} />
      </Grid>
      <Paper
        elevation={2}
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // This separates the input and the icon
        }}
        onSubmit={handleSubmit}
      >
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
