const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const users = new mongoose.Schema({
fullName: { type: String , required: true},
image : { type: String },
email: { type: String , required: true, unique: true },
password:{type:String , required: true } ,
age: { type: Number , required: true },
address: { type: String , required: true },
phoneNumber : {type:String , required:true},
bloodType : { type: String , required: true },
location : { type: String , required: true }
});

// Hashed the password
users.pre('save', async function () {
	this.email = this.email.toLowerCase();
	this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', users);








