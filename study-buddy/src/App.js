import React, { useState } from "react";
import { AppBar, Toolbar, Button, Container, Box, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components for different views
import Dashboard from "./components/Dashboard";
import StudyGroup from "./components/StudyGroup";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import CalendarPage from "./components/CalendarPage"; // Import CalendarPage
import ChatRoom from "./components/ChatRoom"; // Import ChatRoom component

// Simulating user roles
const mockUser = {
  username: "john_doe",
  role: "PremiumUser", // "Admin", "FreeUser", or "PremiumUser"
};

function App() {
  const [user, setUser] = useState(mockUser);

  const renderDashboard = () => {
    if (user.role === "Admin") {
      return <AdminDashboard />;
    } else if (user.role === "PremiumUser") {
      return <Dashboard userRole="PremiumUser" />;
    } else {
      return <Dashboard userRole="FreeUser" />;
    }
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <AppBar position="fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <Toolbar>
            <Button color="inherit" href="/" style={{ fontWeight: "bold" }}>
              Home
            </Button>
            <Button color="inherit" href="/study-group" style={{ fontWeight: "bold" }}>
              Study Groups
            </Button>
            <Button color="inherit" href="/profile" style={{ fontWeight: "bold" }}>
              Profile
            </Button>
            {user.role === "Admin" && (
              <Button color="inherit" href="/admin" style={{ fontWeight: "bold" }}>
                Admin Dashboard
              </Button>
            )}
            <Button
              color="inherit"
              onClick={() => setUser({ ...user, role: "FreeUser" })}
              style={{ fontWeight: "bold" }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Container style={{ marginTop: "100px" }}> {/* Added margin to prevent overlap with AppBar */}
          <Box my={4}>
            <Typography variant="h4" gutterBottom></Typography>
            <Routes>
              <Route path="/" element={renderDashboard()} />
              <Route path="/study-group" element={<StudyGroup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/calendar" element={<CalendarPage />} /> {/* Calendar Page Route */}
              <Route path="/chat-room" element={<ChatRoom />} /> {/* Chat Room Route */}
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
