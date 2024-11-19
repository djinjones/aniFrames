const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

router.post('/register', async (req, res) => {
  const { username, password, secret } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let adminType;
    if (secret === process.env.ADMIN_SECRET) {
      adminType = 'admin';
    } else if (secret === process.env.OWNER_SECRET) {
      adminType = 'owner';
    } else {
      adminType = 'none';
    }

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      adminType,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, adminType: newUser.adminType },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, adminType: user.adminType },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
