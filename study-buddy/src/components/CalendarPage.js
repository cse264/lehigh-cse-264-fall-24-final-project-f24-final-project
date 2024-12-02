import React from "react";
import { Typography } from "@mui/material";
import "./CalendarPage.css"; // Scoped styles for CalendarPage

function CalendarPage() {
  return (
    <div className="calendar-container">
      <Typography variant="h4" gutterBottom style={{ color: "black" }}>
  Study Session Calendar
</Typography>

      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIMEZONE"
        style={{
          border: "0",
          width: "80%",
          height: "600px",
          backgroundColor: "white",
        }}
        title="Google Calendar"
      ></iframe>
    </div>
  );
}

export default CalendarPage;
