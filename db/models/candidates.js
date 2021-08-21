const mongoose = require('mongoose');

const candidates = new mongoose.Schema({
    reqId: {type: mongoose.Schema.Types.ObjectId, ref: "Request"},
    users: [{userId: {type: mongoose.Schema.ObjectId}, confirmedStatus: {type: Boolean}}] //{type: Array}
});

module.exports = mongoose.model("Candidate", candidates);