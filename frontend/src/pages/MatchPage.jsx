import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";

function MatchPage() {
  const [connected, setConnected] = useState(false);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/matching",
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      setConnected(true);
      setStompClient(client);
      console.log("Connected: " + frame);
      client.subscribe("/topic/matching", (reply) => {
        showReply(JSON.parse(reply.body).reply);
      });
    };

    client.onWebSocketError = (error) => {
      console.error("Error with WebSocket:", error);
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers.message);
      console.error("Additional details:", frame.body);
    };

    client.activate();
    return () => {
      setConnected(false);
      client.deactivate();
    };
  }, []);

  const disconnect = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
  };

  const sendMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/match",
        body: JSON.stringify({ message }),
      });
    }
  };

  const showReply = (message) => {
    setReplies((prevReplies) => [...prevReplies, message]);
  };

  return (
    <div>
      <h2>Matching in progress...</h2>
      <button id="disconnect" onClick={disconnect} disabled={!connected}>
        Disconnect
      </button>
      <div id="conversation" style={{ display: connected ? "block" : "none" }}>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button id="send" onClick={sendMessage}>
          Send
        </button>
      </div>
      <div id="replies">
        {replies.map((reply, index) => (
          <div key={index}>{reply}</div>
        ))}
      </div>
    </div>
  );
}

export default MatchPage;
