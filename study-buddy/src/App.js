import React, { useState } from "react";
import { AppBar, Toolbar, Button, Container, Box, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch

// Components for different views
import Dashboard from "./components/Dashboard";
import StudyGroup from "./components/StudyGroup";
import AdminDashboard from "./components/AdminDashboard";
import Profile from './components/Profile';

// Simulating user roles (in real app, this would be dynamic based on login)
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
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/study-group">
              Study Groups
            </Button>
            <Button color="inherit" href="/profile">
              Profile
            </Button>
            {user.role === "Admin" && (
              <Button color="inherit" href="/admin">
                Admin Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={() => setUser({ ...user, role: "FreeUser" })}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Container>
          <Box my={4}>
            <Typography variant="h4" gutterBottom>
              Welcome to StudyBuddy
            </Typography>
            <Routes>
              <Route path="/" element={renderDashboard()} />
              <Route path="/study-group" element={<StudyGroup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
