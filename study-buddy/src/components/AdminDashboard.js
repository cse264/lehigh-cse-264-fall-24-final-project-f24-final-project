import React from "react";
import { Typography, Paper, Button } from "@mui/material";

function AdminDashboard() {
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="body1" paragraph>
        As an admin, you can manage tutor applications, monitor study groups, and enforce academic integrity.
      </Typography>

      <Button variant="contained" color="primary">
        Manage Tutor Applications
      </Button>
      <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
        View Reports
      </Button>
    </Paper>
  );
}

export default AdminDashboard;
