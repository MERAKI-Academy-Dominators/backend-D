const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hospitals = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    location: {type: String, required: true},
});

module.exports = mongoose.model("Hospital", hospitals);
