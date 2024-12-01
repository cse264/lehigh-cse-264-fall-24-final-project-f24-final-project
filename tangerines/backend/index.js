const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require('./firebase-service-account.json')),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore(); // Firestore reference
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all users
app.get('/users', async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = { name, email, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await db.collection('users').add(newUser);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
