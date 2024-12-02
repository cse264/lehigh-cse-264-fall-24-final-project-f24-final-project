import React from "react";
import { Typography, Button, Paper } from "@mui/material";
import "./StudyGroup.css"; // Custom CSS for the page

function StudyGroup() {
  return (
    <div className="video-background">
      <video autoPlay muted loop className="video">
        <source src="/videos/studybuddy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
  <Paper elevation={3} style={{ padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}>
    <Typography variant="h5" gutterBottom>
      Study Groups
    </Typography>

    <Typography variant="body1" paragraph>
      Browse available study groups and join one to study with your peers.
    </Typography>

    <div style={{ marginTop: "20px" }}>
      <Button variant="contained" color="secondary" style={{ margin: "10px" }}>
        Join Math Study Group
      </Button>

      <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
        Join Physics Study Group
      </Button>
    </div>
  </Paper>
</div>

    </div>
  );
}

export default StudyGroup;

