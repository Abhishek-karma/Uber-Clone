const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = async () => {
    const uri = process.env.MONGODB_URI;
    console.log(uri);
    
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectToDb;