const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    const { password, accountType } = req.body;

    // Validate input before creating user
    if (!password || !accountType) {
        return res.status(400).json({ message: 'Password and account type are required.' });
    }

    const user = new User({
        password,  // No need to provide userID; it's auto-generated
        accountType,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); // Return the created user
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
