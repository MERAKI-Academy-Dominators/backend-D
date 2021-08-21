const mongoose = require("mongoose");
const Hospital = require("./hospitals")
const User = require("./user")







const requests = new mongoose.Schema({
    userId: {type:mongoose.Schema.ObjectId , ref: "User"},
    date : { type: Date, default: Date.now } ,
    bloodType : { type: String , required: true},
    hospitalId: {type:mongoose.Schema.ObjectId , ref: "Hospital"},
    requestStatus : {type : Boolean , default:true},
});





module.exports = mongoose.model("Request" , requests)