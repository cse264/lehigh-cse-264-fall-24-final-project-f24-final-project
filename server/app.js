require('dotenv').config();  // Only call it once at the top

const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: ["http://localhost:5173"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.get("/api", (req, res) => {
    res.json({plantTest: ["fern", "flower", "weed"]});
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    const { token } = req.body; // Get the Google OAuth token from the frontend
    if (!token) {
      return res.status(400).send('Token is required');
    }
    try {
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      });
      const payload = ticket.getPayload();
      console.log(payload); 
      res.status(200).send({ message: 'User authenticated', user: payload });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(400).send('Invalid token');
    }
});

// Routes
//const plantRoutes = require('./routes/plants');
//app.use('/api/plants', plantRoutes);

// Start Server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
