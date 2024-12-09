const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await userModel.findOne({token:token})

  if(isBlacklisted){
    return res.status(401).json({message:"Unauthorized"})
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = new ObjectId(decoded.id);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

  