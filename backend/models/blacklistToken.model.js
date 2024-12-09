const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistSchema);

module.exports = BlacklistedToken;