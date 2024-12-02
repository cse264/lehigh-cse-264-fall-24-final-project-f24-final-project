import React from "react";
import { Typography, Paper, Button, Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // CSS for video background and content styling

function Dashboard({ userRole }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const navigate = useNavigate();

  const handleSyncCalendar = () => {
    navigate("/calendar"); // Navigate to the calendar page
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Typography>Study group invitations will appear here.</Typography>;
      case 1:
        return (
          <div>
            <Typography>Calendar showing upcoming sessions.</Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={handleSyncCalendar} // Navigation handler
            >
              Sync with Google Calendar
            </Button>
          </div>
        );
      case 2:
        return (
        <div><Typography>Chat with your study group.</Typography>
        <Button variant="contained" color="primary" style={{ marginTop: "10px" }}
        onClick={() => navigate("/chat-room")}>
        Click here to enter 
      </Button>
      </div> );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Background Video */}
      <video autoPlay muted loop className="video-background">
        <source src="/videos/studybuddy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <div className="dashboard-content">
      <Paper
  elevation={3}
  style={{
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    color: "white", // Ensure text remains visible
    borderRadius: "8px", // Optional: rounded corners
  }}
>
  <Typography variant="h5" gutterBottom>
    {userRole === "PremiumUser" ? "Welcome Premium User!" : "Welcome Free User!"}
  </Typography>

  <Tabs
  value={activeTab}
  onChange={handleTabChange}
  centered
  TabIndicatorProps={{
    style: {
      backgroundColor: "white", // Active tab underline color
    },
  }}
  style={{
    color: "white", // Default text color for all tabs
  }}
>
  <Tab
    label="Invitations"
    style={{
      color: activeTab === 0 ? "white" : "rgba(255, 255, 255, 0.7)", // Lighter color for inactive tabs
    }}
  />
  <Tab
    label="Calendar"
    style={{
      color: activeTab === 1 ? "white" : "rgba(255, 255, 255, 0.7)", // Lighter color for inactive tabs
    }}
  />
  <Tab
    label="Chat"
    style={{
      color: activeTab === 2 ? "white" : "rgba(255, 255, 255, 0.7)", // Lighter color for inactive tabs
    }}
  />
</Tabs>


  <Box mt={3}>{renderTabContent()}</Box>

  {userRole === "PremiumUser" && (
    <Box mt={3}>
      <Button variant="contained" color="primary">
        Request Private Tutoring
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginLeft: "10px" }}
      >
        View Study Group Invitations
      </Button>
    </Box>
  )}

  <Box mt={3}>
    <Button variant="outlined" color="primary">
      Browse Study Groups
    </Button>
  </Box>
</Paper>

      </div>
    </div>
  );
}

export default Dashboard;
