const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new review
router.post('/', async (req, res) => {
    const { movieTitle, reviewBody, reviewRating } = req.body;

    // Validate input before creating review
    if (!movieTitle || !reviewBody || !reviewRating) {
        return res.status(400).json({ message: 'Movie title, review body, and rating are required.' });
    }

    const review = new Review({
        movieTitle, reviewBody, reviewRating
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview); // Return the created review
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a review by movieTitle
router.put('/', async (req, res) => {
    const { movieTitle, reviewBody, reviewRating } = req.body;

    // Validate required inputs
    if (!movieTitle) {
        return res.status(400).json({ message: 'Movie title is required to update review' });
    }

    const update = {};

    if (reviewRating) {
        update.reviewRating = reviewRating;
    }
    if (reviewBody) {
        update.reviewBody = reviewBody;
    }
    if (Object.keys(update).length === 0) {
        return res.status(400).json({ message: 'No valid fields to update.' });
    }

    try {
        const updatedReview = await Review.updateOne(
            { movieTitle }, // Only filter by movieTitle
            { $set: update }
        );
        if (updatedReview.modifiedCount > 0) {
            res.status(200).json({ message: 'Review updated.' });
        } else {
            res.status(404).json({ message: 'No review found to update.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a review by review ID
router.delete('/', async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ message: 'Review ID required to delete review' });
    }

    try {
        const deletedReview = await Review.deleteOne({ _id });
        if (deletedReview.deletedCount > 0) {
            res.status(200).json({ message: 'Review deleted.' });
        } else {
            res.status(404).json({ message: 'No review found to delete.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
