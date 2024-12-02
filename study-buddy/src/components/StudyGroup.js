import React from "react";
import { Typography, Button, Paper } from "@mui/material";

function StudyGroup() {
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Study Groups
      </Typography>

      <Typography variant="body1" paragraph>
        Browse available study groups and join one to study with your peers.
      </Typography>

      <Button variant="outlined" color="primary">
        Join Math Study Group
      </Button>

      <Button variant="outlined" color="primary" style={{ marginLeft: "10px" }}>
        Join Physics Study Group
      </Button>
    </Paper>
  );
}

export default StudyGroup;
