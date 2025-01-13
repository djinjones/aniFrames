const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const routes = require('./routes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI_ALT

//console.log('Mongo URI:', process.env.MONGO_URI);

// app.use(cors({
//   origin: 'http://localhost:3000', // Allow only your React frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: Limit allowed methods
//   credentials: true, // Optional: Allow cookies and credentials
// }));
app.use(express.json());

// Routes
app.use('/api', routes)


app.get('/', (req, res) => {
  res.send('Welcome to AniFrames!');
});

// Mongoose connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');


    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
