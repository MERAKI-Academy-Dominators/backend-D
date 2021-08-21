const mongoose = require("mongoose");

const roles = new mongoose.Schema({
    role: {type:String} ,
    permissions: [{type:String}]
  })



module.exports = mongoose.model("Role" , roles)