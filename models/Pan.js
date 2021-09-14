const mongoose = require('mongoose');

const PanSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  pan_card_no: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  father_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Pan = mongoose.model('Pan', PanSchema);
