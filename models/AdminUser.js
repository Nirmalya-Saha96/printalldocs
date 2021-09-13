const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: {
      type: Number,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = AdminUser = mongoose.model('AdminUser', AdminUserSchema);
