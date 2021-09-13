const mongoose = require('mongoose');

const VoterSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    epic_no: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    name_locality: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: String,
      required: true
    },
    relation_father_husband: {
      type: String,
      required: true
    },
    father_husband_name: {
      type: String,
      required: true
    },
    father_husband_name_local_language: {
      type: String,
      required: true
    },
    police_station: {
      type: String,
      required: true
    },
    tahshil: {
      type: String,
      required: true
    },
    assembly: {
      type: String,
      required: true
    },
    assembly_local_language: {
      type: String,
      required: true
    },
    part_number: {
      type: String,
      required: true
    },
    part_name: {
      type: String,
      required: true
    },
    part_name_lacal_language: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    address: {
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

module.exports = Voter = mongoose.model('Voter', VoterSchema);
