const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  points: {
    type: Number,
    default: 0
  },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Points = mongoose.model('Points', PointsSchema);
