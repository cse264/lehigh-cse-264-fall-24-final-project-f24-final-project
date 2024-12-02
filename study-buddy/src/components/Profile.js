import React from "react";
import { Typography, Paper, Box, Button, Avatar } from "@mui/material";
import "./Profile.css"; // Import the Profile page styles

function Profile() {
  return (
    <div className="profile-container">
      {/* Background Video */}
      <video autoPlay muted loop className="video-background">
        <source src="/videos/studybuddy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <Paper
        elevation={3}
        className="profile-content"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
          color: "white", // Ensure text remains visible
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {/* Profile Avatar */}
          <Avatar
            alt="John Doe"
            src="https://randomuser.me/api/portraits/men/63.jpg" // Random male profile picture
            sx={{ width: 100, height: 100 }}
          />

          <Typography variant="h5" gutterBottom>
            John Doe
          </Typography>
          <Typography variant="body1" style={{ color: "white" }}>
  Premium User
</Typography>

        </Box>

        {/* Profile Information */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Account Details
          </Typography>
          <Typography variant="body2">Email: johndoe@example.com</Typography>
          <Typography variant="body2">Membership: Premium User</Typography>
          <Typography variant="body2">Joined: January 2024</Typography>
        </Box>

        {/* Edit Profile Button */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default Profile;
