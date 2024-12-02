import React, { useState } from "react";
import { Typography, TextField, Button, Box, List, ListItem, ListItemText } from "@mui/material";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Group Chat
      </Typography>
      <Box
        style={{
          width: "80%",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Chat Messages */}
        <List style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>

        {/* Input Box */}
        <Box style={{ display: "flex", gap: "10px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ChatRoom;
