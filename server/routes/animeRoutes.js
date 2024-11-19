const express = require('express');
const Anime = require('../models/Anime');
const authorizeAdmin = require('../utils/authmiddleware');
const router = express.Router();    

router.get('/', async (req, res) => {
  try {
    // Fetch a random anime using MongoDB aggregation
    const randomAnime = await Anime.aggregate([{ $sample: { size: 1 } }]);

    if (randomAnime.length === 0) {
      return res.status(404).json({ message: 'No anime found' });
    }

    const anime = randomAnime[0];

    // Get all titles
    const titles = anime.titles;

    // Get 4 random images from the `imageUrl` array
    const images = getRandomImages(anime.imageUrl, 4);

    res.json({ titles, images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to select `n` random elements from an array
function getRandomImages(imageArray, n) {
  if (!Array.isArray(imageArray)) return [];
  const shuffled = imageArray.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, n); // Return the first `n` elements
}

// get route to find all anime titles
router.get('/names', async (req, res) => {
  try {
    const animeNames = await Anime.find({}, 'titles -_id');
    res.json(animeNames.map(anime => anime.titles));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add new anime (admin/owner only)
router.post('/', authorizeAdmin, async (req, res) => {
  try {
    const { titles, imageUrl, characters } = req.body;
    const newAnime = new Anime({ titles, imageUrl, characters });
    const savedAnime = await newAnime.save();
    res.status(201).json(savedAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
