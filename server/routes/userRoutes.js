const express = require('express');
const User = require('../models/User');
const userValidationSchema = require('../utils/userValidationSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

router.post('/signup', async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  console.log('recieved signup request'); //debugging
  if (error) {
    return res.status(400).json({ message: 'userRoutes.js: ln14: ' + error.details[0].message, });
  }

  const { username, email, password, secret } = req.body;

  try {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
  }
  console.log('signup request recieved: ', req.body)
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    } else if (existingEmail) {
      return res.status(400).json({ message: 'email not valid or already in use' })
    }

    let adminType;
    if (secret === `${process.env.ADMIN_SECRET}`) {
      adminType = 'admin';
    } else if (secret === `${process.env.OWNER_SECRET}`) {
      adminType = 'owner';
    } else {
      adminType = 'none';
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      adminType,
    });

    await newUser.save();
    console.log(`user: ${username} saved, admin type: ${adminType}`)// debugging

    const token = jwt.sign(
      { userId: newUser._id, adminType: newUser.adminType },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const authInfo = [username, email, adminType]

    res.status(201).json({ authInfo, token, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.error(err);
  }
});

router.get('/authInfo', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('username email adminType');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ authInfo: { username: user.username, email: user.email, adminType: user.adminType } });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying token' });
  }
});

router.post('/login', async (req, res) => {
  const { userOrEmail, password } = req.body;
  let isUser = false;

  try {
    console.log('Login request received:', req.body);

    // Regex to check for a (simple) valid email format
    const emailRegex = /^\S+@\S+\.\S+$/;

    let user;
    if (emailRegex.test(userOrEmail)) {
      // userOrEmail matches email format
      user = await User.findOne({ email: userOrEmail });
    } else {
      // userOrEmail does not match email format -> treat as username
      isUser = true;
      user = await User.findOne({ username: userOrEmail });
    }

    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    // After finally consulting chat gpt 1.o, it pointed out the fact that I might be double hashing the password, which I was because it gets hashed when saving the password to the database, but I was hashing in the userRoutes.js file as well. You fool!
    // I am going to leave these commented out but not deleted so I hopefully remember to never do that again!
    // Log the hashed password (DEBUGGING ONLY)
    // console.log('Hashed password from DB:', user.password);
    // const testCompare = await bcrypt.compare('password', user.password)
    // console.log('test compare: ', testCompare)
    // console.log('password type: ', typeof password,'user.password type: ', typeof user.password)
    // Compare password using bcrypt

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      console.log('no user match')
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token (valid for 30 days)
    const token = jwt.sign(
      { userId: user._id, adminType: user.adminType },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      token,
      message: 'User logged in successfully'
    });

    console.log('User logged in successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;