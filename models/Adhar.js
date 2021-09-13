const mongoose = require('mongoose');

const AdharSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    adhar_card_no: {
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
    house_no: {
      type: String,
      required: true
    },
    gali_locality: {
      type: String,
      required: true
    },
    post_office: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pin_code: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: String,
      required: true
    },
    date_of_birth_locality: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    gender_local: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    local_language: {
      type: String,
      required: true
    },
    address_local_language: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Adhar = mongoose.model('adhar', AdharSchema);
