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
app.post('/ingredients', async (req, res) => {
    try {
        const { idIngredient, title, description, type } = req.body;

        // Validate request body
        if (!idIngredient || !title || !description) {
            return res.status(400).json({ error: 'idIngredient, title, and description are required.' });
        }

        // Add the ingredient to the database
        await db.collection('ingredients').doc(idIngredient).set({
            idIngredient,
            title,
            description,
            type: type || null, // Default type to null if not provided
        });

        res.status(201).json({ message: 'Ingredient added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/ingredients/:id', async (req, res) => {
    try {
        const ingredientId = req.params.id;
        const doc = await db.collection('ingredients').doc(ingredientId).get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Ingredient not found.' });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/ingredients', async (req, res) => {
    try {
        const snapshot = await db.collection('ingredients').get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'No ingredients found.' });
        }

        const ingredients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
