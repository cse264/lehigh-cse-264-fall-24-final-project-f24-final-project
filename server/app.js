require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],
};

const app = express()

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({plantTest: ["fern", "flower", "weed"]});
})

// Routes
//const plantRoutes = require('./routes/plants');
//app.use('/api/plants', plantRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
//new edit
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));