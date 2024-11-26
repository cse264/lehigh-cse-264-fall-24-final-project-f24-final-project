require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json());

// Routes
const plantRoutes = require('./routes/plants');
app.use('/api/plants', plantRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));