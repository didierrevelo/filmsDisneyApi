const mongoose = require('mongoose');
require('dotenv').config();

/**
 * this is the default configuration for the conect to the database mongo
 */
const dbConnect = () => {
  // come of the environment variables
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, res) => {
    if (err) {
      console.log('Error connecting to the database');
    } else {
      console.log('Connected to MongoDB');
    }
  });
}

module.exports = dbConnect;
