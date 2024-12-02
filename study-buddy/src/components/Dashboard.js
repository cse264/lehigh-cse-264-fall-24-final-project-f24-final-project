import React from "react";
import { Typography, Paper, Button } from "@mui/material";

function Dashboard({ userRole }) {
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {userRole === "PremiumUser"
          ? "Welcome Premium User!"
          : "Welcome Free User!"}
      </Typography>

      <Typography variant="body1" paragraph>
        Here you can browse study groups, join sessions, and interact with your peers.
      </Typography>

      {userRole === "PremiumUser" && (
        <>
          <Button variant="contained" color="primary">
            Request Private Tutoring
          </Button>
          <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
            View Study Group Invitations
          </Button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button variant="outlined" color="primary">
          Browse Study Groups
        </Button>
      </div>
    </Paper>
  );
}

export default Dashboard;
