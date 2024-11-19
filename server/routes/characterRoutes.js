const express = require('express');
const Character = require('../models/Character');
const authorizeAdminOrOwner = require('../utils/authmiddleware'); // Import middleware

const router = express.Router();

// Public route: Anyone can get the list of characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find().populate('anime');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected route: Only admin or owner can add new characters
router.post('/', authorizeAdminOrOwner, async (req, res) => {
  try {
    const newCharacter = new Character(req.body);
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
