const express = require('express');
const userRoutes = require('./userRoutes');
const characterRoutes = require('./characterRoutes');
const animeRoutes = require('./animeRoutes');
const submissionRoutes = require('./submissionRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/character', characterRoutes);
router.use('/anime', animeRoutes);
router.use('/submissions', submissionRoutes);

module.exports = router;