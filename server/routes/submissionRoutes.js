const express = require('express');
const Submission = require('../models/Submission');
const User = require('../models/User'); // Import User model

const router = express.Router();

router.post('/submit', async (req, res) => {
    const { anime, newAnime, animeImages, characters, characterImages, userId } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to submit a new submission!' });
        }

        // Create a new submission
        const submission = new Submission({
            anime,
            newAnime,
            animeImages,
            characters,
            characterImages,
            user: user._id, // Reference the user's ID
        });

        await submission.save();
        res.status(201).json({ message: 'Submission sent successfully', submission });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.get('/queue', async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate('user', 'username email') // Populate `user` field with `username` and `email` fields
            .exec();

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
