const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/review');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
